import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly toastMessage = signal<string | null>(null);

  async copy(text: string): Promise<void> {
    if (!this.isBrowser || !text) {
      return;
    }

    await navigator.clipboard.writeText(text);
    this.showToast('Copied content to the clipboard!');
  }

  showToast(message: string, durationMs = 1500): void {
    if (!this.isBrowser) {
      return;
    }

    this.toastMessage.set(message);
    window.setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, durationMs);
  }
}
