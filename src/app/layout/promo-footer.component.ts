import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-footer',
  imports: [RouterLink],
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
                [innerHTML]="item.icon"
              ></span>
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
  protected readonly highlights = [
    {
      label: 'Open-Source',
      description: 'Inspect, fork, and contribute on GitHub.',
      href: 'https://github.com/emielkwakkel/e-ncrypt.com',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clip-rule="evenodd"/></svg>`,
    },
    {
      label: 'No tracking',
      description: 'No analytics, cookies, or third-party scripts.',
      href: null,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd"/></svg>`,
    },
    {
      label: 'No backend',
      description: 'Everything runs locally in your browser.',
      href: null,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/></svg>`,
    },
    {
      label: 'Hosted in Europe',
      description: 'Served from European infrastructure.',
      href: null,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M11.54 22.351h.008a.75.75 0 0 0 .004-.003l8.999-10.5a.75.75 0 0 0-.004-1.002A12.416 12.416 0 0 0 12 2.25c-2.717 0-5.216.856-7.287 2.309a.75.75 0 0 0-.004 1.002l8.999 10.5a.75.75 0 0 0 .832.19Z" clip-rule="evenodd"/></svg>`,
    },
  ];
}
