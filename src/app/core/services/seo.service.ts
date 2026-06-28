import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO,
  JsonLdType,
  SeoData,
  SITE_NAME,
  SITE_URL,
} from '../seo/seo.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly jsonLdScriptId = 'seo-json-ld';
  private readonly canonicalLinkId = 'seo-canonical';

  updateForRoute(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): void {
    this.applySeo(this.resolveSeo(route, state));
  }

  private resolveSeo(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): SeoData {
    const path = state.url.split('?')[0].split('#')[0];

    if (path === '/' || path === '') {
      return {
        ...DEFAULT_SEO,
        canonicalPath: '/encrypt',
      };
    }

    let current: ActivatedRouteSnapshot | null = route;
    while (current?.firstChild) {
      current = current.firstChild;
    }

    const routeSeo = current?.data['seo'] as SeoData | undefined;
    return routeSeo ?? DEFAULT_SEO;
  }

  private applySeo(seo: SeoData): void {
    const pagePath = seo.canonicalPath ?? seo.path;
    const canonicalUrl = `${SITE_URL}${pagePath}`;
    const ogImage = seo.image ?? DEFAULT_OG_IMAGE;

    this.title.setTitle(seo.title);

    this.updateMetaTag('name', 'description', seo.description);
    this.updateMetaTag('property', 'og:title', seo.title);
    this.updateMetaTag('property', 'og:description', seo.description);
    this.updateMetaTag('property', 'og:url', canonicalUrl);
    this.updateMetaTag('property', 'og:type', 'website');
    this.updateMetaTag('property', 'og:site_name', SITE_NAME);
    this.updateMetaTag('property', 'og:image', ogImage);
    this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.updateMetaTag('name', 'twitter:title', seo.title);
    this.updateMetaTag('name', 'twitter:description', seo.description);
    this.updateMetaTag('name', 'twitter:image', ogImage);

    this.setCanonical(canonicalUrl);
    this.setJsonLd(seo, canonicalUrl);
  }

  private updateMetaTag(
    attr: 'name' | 'property',
    selector: string,
    content: string,
  ): void {
    if (this.meta.getTag(`${attr}="${selector}"`)) {
      this.meta.updateTag({ [attr]: selector, content });
    } else {
      this.meta.addTag({ [attr]: selector, content });
    }
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    if (!head) {
      return;
    }

    let link = this.document.getElementById(
      this.canonicalLinkId,
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.id = this.canonicalLinkId;
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setJsonLd(seo: SeoData, canonicalUrl: string): void {
    const head = this.document.head;
    if (!head) {
      return;
    }

    const jsonLdType: JsonLdType = seo.jsonLdType ?? 'WebPage';
    const schema =
      jsonLdType === 'WebApplication'
        ? {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: SITE_NAME,
            url: canonicalUrl,
            description: seo.description,
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: seo.title,
            url: canonicalUrl,
            description: seo.description,
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
            },
          };

    let script = this.document.getElementById(
      this.jsonLdScriptId,
    ) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = this.jsonLdScriptId;
      script.type = 'application/ld+json';
      head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }
}
