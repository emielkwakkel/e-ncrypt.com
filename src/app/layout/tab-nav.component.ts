import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Toolbar, ToolbarWidget } from '@angular/aria/toolbar';

@Component({
  selector: 'app-tab-nav',
  imports: [Toolbar, ToolbarWidget, RouterLink, RouterLinkActive],
  template: `
    <nav
      ngToolbar
      orientation="horizontal"
      class="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-card/95 backdrop-blur dark:border-slate-700 dark:bg-card-dark/95"
      aria-label="Main navigation"
    >
      <div class="mx-auto flex max-w-lg">
        @for (tab of tabs; track tab.path) {
          <a
            ngToolbarWidget
            [value]="tab.path"
            [routerLink]="tab.path"
            routerLinkActive="nav-link-active"
            [routerLinkActiveOptions]="tab.exact ? { exact: true } : { exact: false }"
            class="nav-link flex-1"
          >
            <span aria-hidden="true">{{ tab.icon }}</span>
            {{ tab.label }}
          </a>
        }
      </div>
    </nav>
  `,
})
export class TabNavComponent {
  protected readonly tabs = [
    { path: '/encrypt', label: 'Encrypt', icon: '🔒', exact: false },
    { path: '/hash', label: 'Hash', icon: '#️⃣', exact: false },
    { path: '/settings', label: 'Settings', icon: '⚙️', exact: true },
    {
      path: '/settings/about',
      label: 'About',
      icon: 'ℹ️',
      exact: true,
    },
  ];
}
