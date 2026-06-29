import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Toolbar, ToolbarWidget } from '@angular/aria/toolbar';
import { AppIconComponent } from '../core/icons/app-icon.component';
import { AppIconName } from '../core/icons/app-icons';

@Component({
  selector: 'app-tab-nav',
  imports: [Toolbar, ToolbarWidget, RouterLink, RouterLinkActive, AppIconComponent],
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
            <app-icon [name]="tab.icon" class="size-5" />
            {{ tab.label }}
          </a>
        }
      </div>
    </nav>
  `,
})
export class TabNavComponent {
  protected readonly tabs: {
    path: string;
    label: string;
    icon: AppIconName;
    exact: boolean;
  }[] = [
    { path: '/encrypt', label: 'Encrypt', icon: 'eyeSlash', exact: false },
    { path: '/hash', label: 'Hash', icon: 'hashnode', exact: false },
    { path: '/settings', label: 'Settings', icon: 'gear', exact: true },
    { path: '/settings/about', label: 'About', icon: 'gitAlt', exact: true },
  ];
}
