import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-2xl space-y-6">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm dark:border-slate-700 dark:bg-card-dark">
        <img
          src="assets/encryption-banner.jpeg"
          alt="Encryption illustration"
          class="h-40 w-full object-cover"
        />
        <div class="space-y-4 p-6">
          <div>
            <p class="text-sm font-medium uppercase tracking-wide text-muted">
              Background
            </p>
            <h1 class="text-2xl font-semibold">E-ncrypt</h1>
          </div>
          <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            E-ncrypt is open-source and developed by Emiel Kwakkel. CryptoJS
            ensures your content is encrypted and decrypted safely on your
            device. No external APIs are called, nor will any information leave
            your device.
          </p>

          <div class="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            <a
              href="https://cryptojs.gitbook.io/docs/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              CryptoJS documentation
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/emielkwakkel/e-ncrypt"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Application on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <a
        routerLink="/settings"
        class="inline-flex text-sm font-medium text-accent hover:underline"
      >
        ← Back to settings
      </a>
    </section>
  `,
})
export class AboutComponent {}
