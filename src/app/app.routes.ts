import { Routes } from '@angular/router';
import { seoGuard } from './core/seo/seo.guard';
import { ROUTE_SEO } from './core/seo/seo.config';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell.component').then((m) => m.AppShellComponent),
    canActivate: [seoGuard],
    canActivateChild: [seoGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: {
          seo: { ...ROUTE_SEO.encrypt, canonicalPath: '/encrypt' },
        },
        loadComponent: () =>
          import('./features/encrypt/encrypt.component').then(
            (m) => m.EncryptComponent,
          ),
      },
      {
        path: 'encrypt',
        data: { seo: ROUTE_SEO.encrypt },
        loadComponent: () =>
          import('./features/encrypt/encrypt.component').then(
            (m) => m.EncryptComponent,
          ),
      },
      {
        path: 'hash',
        data: { seo: ROUTE_SEO.hash },
        loadComponent: () =>
          import('./features/hash/hash.component').then((m) => m.HashComponent),
      },
      {
        path: 'settings',
        data: { seo: ROUTE_SEO.settings },
        loadComponent: () =>
          import('./features/settings/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
      {
        path: 'settings/about',
        data: { seo: ROUTE_SEO.about },
        loadComponent: () =>
          import('./features/about/about.component').then(
            (m) => m.AboutComponent,
          ),
      },
    ],
  },
];
