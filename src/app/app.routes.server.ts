import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'encrypt', renderMode: RenderMode.Prerender },
  { path: 'hash', renderMode: RenderMode.Prerender },
  { path: 'settings', renderMode: RenderMode.Prerender },
  { path: 'settings/about', renderMode: RenderMode.Prerender },
];
