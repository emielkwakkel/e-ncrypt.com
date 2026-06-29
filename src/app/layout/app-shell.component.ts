import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AppIconComponent } from '../core/icons/app-icon.component';
import { AppIconName } from '../core/icons/app-icons';
import { ClipboardService } from '../core/services/clipboard.service';
import { SettingsService } from '../core/services/settings.service';
import { SettingsPanelComponent } from '../features/settings/settings-panel.component';
import { PromoFooterComponent } from './promo-footer.component';
import { TabNavComponent } from './tab-nav.component';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SettingsPanelComponent,
    TabNavComponent,
    PromoFooterComponent,
    AppIconComponent,
  ],
  template: `
    <div class="flex min-h-dvh flex-col">
      <header
        class="sticky top-0 z-20 w-full border-b border-slate-200/80 bg-surface/90 backdrop-blur dark:border-slate-700/80 dark:bg-surface-dark/90"
      >
        <div
          class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4"
        >
          <a routerLink="/encrypt" class="flex min-w-0 items-center gap-3">
            <img
              src="assets/icon/favicon.png"
              alt=""
              width="32"
              height="32"
              class="rounded-lg"
            />
            <div class="min-w-0">
              <p class="text-lg font-semibold tracking-tight">E-ncrypt</p>
              <p class="truncate text-sm text-muted">{{ pageTitle() }}</p>
            </div>
          </a>

          <div class="hidden items-center gap-1 lg:flex">
            <nav aria-label="Main navigation" class="flex items-center gap-1">
              @for (link of navLinks; track link.path) {
                <a
                  [routerLink]="link.path"
                  routerLinkActive="header-nav-active"
                  class="header-nav-link inline-flex items-center gap-2"
                >
                  <app-icon [name]="link.icon" class="size-4" />
                  {{ link.label }}
                </a>
              }
            </nav>

            <button
              type="button"
              class="header-nav-link inline-flex items-center gap-2"
              [class.header-nav-active]="settings.darkMode()"
              [attr.aria-label]="
                settings.darkMode() ? 'Switch to light mode' : 'Switch to dark mode'
              "
              [attr.aria-pressed]="settings.darkMode()"
              (click)="toggleDarkMode()"
            >
              <app-icon name="circleHalfStroke" class="size-4" />
              Dark mode
            </button>
          </div>
        </div>
      </header>

      <div
        class="mx-auto flex w-full flex-1 flex-col lg:flex-row"
        [class.max-w-6xl]="!isAboutPage()"
      >
        <main class="flex min-w-0 flex-1 flex-col">
          <div
            class="flex-1 p-4 pb-24 lg:pb-4"
          >
            <router-outlet />
          </div>
          <app-tab-nav class="lg:hidden" />
        </main>

        @switch (settingsAsideMode()) {
          @case ('encryption') {
            <aside
              class="hidden w-full max-w-md border-l border-slate-200 dark:border-slate-700 lg:block"
            >
              <app-settings-panel
                [showEncryption]="true"
                [showHashing]="false"
                [showAppearance]="false"
              />
            </aside>
          }
          @case ('hashing') {
            <aside
              class="hidden w-full max-w-md border-l border-slate-200 dark:border-slate-700 lg:block"
            >
              <app-settings-panel
                [showEncryption]="false"
                [showHashing]="true"
                [showAppearance]="false"
              />
            </aside>
          }
        }
      </div>

      @if (!isAboutPage()) {
        <app-promo-footer class="hidden lg:block" />
      }

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
  protected readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly navLinks: { path: string; label: string; icon: AppIconName }[] = [
    { path: '/encrypt', label: 'Encryption', icon: 'eyeSlash' },
    { path: '/hash', label: 'Hashing', icon: 'hashnode' },
    { path: '/settings/about', label: 'About', icon: 'gitAlt' },
  ];

  protected readonly pageTitle = computed(() => {
    const url = this.currentUrl();
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

  protected readonly isAboutPage = computed(() =>
    this.currentUrl().startsWith('/settings/about'),
  );

  protected readonly settingsAsideMode = computed(() => {
    const url = this.currentUrl();
    if (url.startsWith('/hash')) {
      return 'hashing' as const;
    }
    if (url.startsWith('/encrypt') || url === '/' || url.startsWith('/?')) {
      return 'encryption' as const;
    }
    return null;
  });

  protected toggleDarkMode(): void {
    this.settings.setDarkModeEnabled(!this.settings.darkMode());
  }
}
