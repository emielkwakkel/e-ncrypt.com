import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
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
                  [innerHTML]="point.icon"
                ></span>
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
                [innerHTML]="tech.icon"
              ></span>
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
            class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-accent/40 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Source on GitHub
            <span aria-hidden="true" class="text-muted">↗</span>
          </a>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  protected readonly privacyPoints = [
    {
      title: 'No tracking or analytics',
      description: 'We do not collect usage data, set tracking cookies, or load third-party analytics.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd"/></svg>`,
    },
    {
      title: 'No backend or database',
      description: 'There is no server-side processing — cryptography runs entirely in your browser.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4"><path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z"/></svg>`,
    },
    {
      title: 'Hosted in Europe',
      description: 'The static site is deployed on European infrastructure for low-latency regional access.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5.994a.75.75 0 0 1 .75.75v3.25a.75.75 0 0 1-1.5 0V6.744A.75.75 0 0 1 10 5.994ZM10 13a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" clip-rule="evenodd"/></svg>`,
    },
    {
      title: 'Open-source',
      description: 'The full source code is available on GitHub for review and contributions.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M10 1a9 9 0 1 0 9 9 9.011 9.011 0 0 0-9-9Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm.75 4.25a.75.75 0 0 0-1.5 0v3.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V6.75Z" clip-rule="evenodd"/></svg>`,
    },
  ];

  protected readonly techStack = [
    {
      name: 'Angular',
      description: 'Modern web framework',
      href: 'https://angular.dev/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M9.93 12.645h4.134L11.996 7.74 9.93 12.645Zm7.308-7.092-1.066 6.313L14.714 17.1h-5.428l-1.458 2.668H2.3l9.996-17.208 4.946-.015ZM12 2.476l-1.693 2.946h3.386L12 2.476Z"/></svg>`,
    },
    {
      name: 'CryptoJS',
      description: 'Client-side cryptography',
      href: 'https://cryptojs.gitbook.io/docs/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd"/></svg>`,
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first styling',
      href: 'https://tailwindcss.com/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.12 4.59 2.12 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.12 4.59 2.12 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12Z"/></svg>`,
    },
    {
      name: 'GitHub',
      description: 'Source repository',
      href: 'https://github.com/emielkwakkel/e-ncrypt.com',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clip-rule="evenodd"/></svg>`,
    },
  ];
}
