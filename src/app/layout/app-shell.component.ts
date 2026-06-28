import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ClipboardService } from '../core/services/clipboard.service';
import { SettingsPanelComponent } from '../features/settings/settings-panel.component';
import { TabNavComponent } from './tab-nav.component';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    SettingsPanelComponent,
    TabNavComponent,
  ],
  template: `
    <div class="mx-auto flex min-h-dvh max-w-6xl flex-col">
      <header
        class="sticky top-0 z-20 border-b border-slate-200/80 bg-surface/90 px-4 py-4 backdrop-blur dark:border-slate-700/80 dark:bg-surface-dark/90"
      >
        <div class="flex items-center gap-3">
          <img
            src="assets/icon/favicon.png"
            alt=""
            width="32"
            height="32"
            class="rounded-lg"
          />
          <div>
            <p class="text-lg font-semibold tracking-tight">E-ncrypt</p>
            <p class="text-sm text-muted">{{ pageTitle() }}</p>
          </div>
        </div>
      </header>

      <div class="flex flex-1 flex-col lg:flex-row">
        <main class="flex min-w-0 flex-1 flex-col">
          <div class="flex-1 p-4 pb-24 lg:pb-4">
            <router-outlet />
          </div>
          <app-tab-nav class="lg:hidden" />
        </main>

        <aside
          class="hidden w-full max-w-md border-l border-slate-200 dark:border-slate-700 lg:block"
        >
          <app-settings-panel />
        </aside>
      </div>

      @if (clipboard.toastMessage(); as message) {
        <div
          class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
          role="status"
        >
          {{ message }}
        </div>
      }
    </div>
  `,
})
export class AppShellComponent {
  protected readonly clipboard = inject(ClipboardService);
  private readonly router = inject(Router);

  protected readonly pageTitle = computed(() => {
    const url = this.router.url;
    if (url.startsWith('/settings/about')) {
      return 'About';
    }
    if (url.startsWith('/settings')) {
      return 'Settings';
    }
    if (url.startsWith('/hash')) {
      return 'Hashing';
    }
    return 'Encryption';
  });
}
