import { Component } from '@angular/core';
import { AppIconComponent } from '../../core/icons/app-icon.component';
import { AppIconName } from '../../core/icons/app-icons';

@Component({
  selector: 'app-about',
  imports: [AppIconComponent],
  template: `
    <div class="space-y-10">
      <section
        class="relative overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm dark:border-slate-700 dark:bg-card-dark"
      >
        <img
          src="assets/encryption-banner.jpeg"
          alt="Encryption illustration"
          class="h-48 w-full object-cover sm:h-64"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"
        ></div>
        <div class="absolute inset-x-0 bottom-0 flex items-end gap-4 p-6 sm:p-8">
          <img
            src="assets/icon/logo-192.png"
            alt=""
            width="72"
            height="72"
            class="rounded-2xl shadow-lg ring-2 ring-white/20"
          />
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              E-ncrypt
            </h1>
            <p class="mt-1 max-w-2xl text-sm text-slate-200 sm:text-base">
              Client-side encryption and hashing — no data ever leaves your device.
            </p>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div
          class="rounded-2xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-700 dark:bg-card-dark"
        >
          <h2 class="text-lg font-semibold">Our mission</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            E-ncrypt is open-source software developed by Emiel Kwakkel. CryptoJS
            ensures your content is encrypted and decrypted safely on your device.
            No external APIs are called, and no information leaves your browser.
          </p>
          <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Whether you need to protect a note, verify a hash, or share encrypted
            text, E-ncrypt keeps the entire workflow local, transparent, and under
            your control.
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-700 dark:bg-card-dark"
        >
          <h2 class="text-lg font-semibold">Privacy by design</h2>
          <ul class="mt-4 space-y-3">
            @for (point of privacyPoints; track point.title) {
              <li class="flex items-start gap-3">
                <span
                  class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
                  aria-hidden="true"
                >
                  <app-icon [name]="point.icon" class="size-4" />
                </span>
                <div>
                  <p class="text-sm font-medium">{{ point.title }}</p>
                  <p class="text-xs leading-relaxed text-muted">
                    {{ point.description }}
                  </p>
                </div>
              </li>
            }
          </ul>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Built with</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (tech of techStack; track tech.name) {
            <a
              [href]="tech.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-card p-4 shadow-sm transition hover:border-accent/40 hover:shadow-md dark:border-slate-700 dark:bg-card-dark dark:hover:border-accent/40"
            >
              <span
                class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-accent/10 group-hover:text-accent dark:bg-slate-800 dark:text-slate-200"
                aria-hidden="true"
              >
                @if (tech.icon) {
                  <app-icon [name]="tech.icon" class="size-6" />
                } @else {
                  <span [innerHTML]="tech.svg"></span>
                }
              </span>
              <div>
                <p class="text-sm font-semibold">{{ tech.name }}</p>
                <p class="text-xs text-muted">{{ tech.description }}</p>
              </div>
            </a>
          }
        </div>
      </section>

      <section
        class="rounded-2xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-700 dark:bg-card-dark"
      >
        <h2 class="text-lg font-semibold">Resources</h2>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href="https://cryptojs.gitbook.io/docs/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-accent/40 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            CryptoJS documentation
            <span aria-hidden="true" class="text-muted">↗</span>
          </a>
          <a
            href="https://github.com/emielkwakkel/e-ncrypt.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-accent/40 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Source on GitHub
            <app-icon name="github" class="size-4 text-muted" />
          </a>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  protected readonly privacyPoints: {
    title: string;
    description: string;
    icon: AppIconName;
  }[] = [
    {
      title: 'No tracking or analytics',
      description:
        'We do not collect usage data, set tracking cookies, or load third-party analytics.',
      icon: 'locationCrosshairs',
    },
    {
      title: 'No backend or database',
      description:
        'There is no server-side processing — cryptography runs entirely in your browser.',
      icon: 'server',
    },
    {
      title: 'Hosted in Europe',
      description:
        'The static site is deployed on European infrastructure for low-latency regional access.',
      icon: 'earthEurope',
    },
    {
      title: 'Open-source',
      description:
        'The full source code is available on GitHub for review and contributions.',
      icon: 'gitAlt',
    },
  ];

  protected readonly techStack: {
    name: string;
    description: string;
    href: string;
    icon?: AppIconName;
    svg?: string;
  }[] = [
    {
      name: 'Angular',
      description: 'Modern web framework',
      href: 'https://angular.dev/',
      icon: 'angular',
    },
    {
      name: 'CryptoJS',
      description: 'Client-side cryptography',
      href: 'https://cryptojs.gitbook.io/docs/',
      icon: 'eyeSlash',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first styling',
      href: 'https://tailwindcss.com/',
      icon: 'tailwindCss',
    },
    {
      name: 'GitHub',
      description: 'Source repository',
      href: 'https://github.com/emielkwakkel/e-ncrypt.com',
      icon: 'github',
    },
  ];
}
