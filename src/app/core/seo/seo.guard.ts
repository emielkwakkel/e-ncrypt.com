import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { SeoService } from '../services/seo.service';

export const seoGuard: CanActivateChildFn = (route, state) => {
  inject(SeoService).updateForRoute(route, state);
  return true;
};
