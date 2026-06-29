import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppIconComponent } from '../core/icons/app-icon.component';
import { AppIconName } from '../core/icons/app-icons';

@Component({
  selector: 'app-promo-footer',
  imports: [RouterLink, AppIconComponent],
  template: `
    <footer
      class="border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-slate-700/80 dark:from-slate-900 dark:to-slate-950"
      aria-label="Privacy and hosting highlights"
    >
      <div class="mx-auto max-w-6xl px-4 py-8">
        <div
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-center"
        >
          @for (item of highlights; track item.label) {
            <div class="flex items-start gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent dark:bg-accent/20"
                aria-hidden="true"
              >
                <app-icon [name]="item.icon" class="size-5" />
              </span>
              <div>
                @if (item.href) {
                  <a
                    [href]="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-slate-900 transition hover:text-accent dark:text-slate-100"
                  >
                    {{ item.label }}
                  </a>
                } @else {
                  <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {{ item.label }}
                  </p>
                }
                <p class="mt-0.5 text-xs leading-relaxed text-muted">
                  {{ item.description }}
                </p>
              </div>
            </div>
          }

          <a
            routerLink="/settings/about"
            class="btn-primary inline-flex items-center justify-center gap-2 self-start whitespace-nowrap lg:self-center"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-4"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class PromoFooterComponent {
  protected readonly highlights: {
    label: string;
    description: string;
    href: string | null;
    icon: AppIconName;
  }[] = [
    {
      label: 'Open-Source',
      description: 'Inspect, fork, and contribute on GitHub.',
      href: 'https://github.com/emielkwakkel/e-ncrypt.com',
      icon: 'gitAlt',
    },
    {
      label: 'No tracking',
      description: 'No analytics, cookies, or third-party scripts.',
      href: null,
      icon: 'locationCrosshairs',
    },
    {
      label: 'No backend',
      description: 'Everything runs locally in your browser.',
      href: null,
      icon: 'server',
    },
    {
      label: 'Hosted in Europe',
      description: 'Served from European infrastructure.',
      href: null,
      icon: 'earthEurope',
    },
  ];
}
