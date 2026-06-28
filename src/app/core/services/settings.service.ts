import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  EncryptionAlgorithmOptions,
  EncryptionAlgorithms,
  HashingAlgorithmOptions,
  HashingAlgorithms,
} from './crypto.service';

const STORAGE_KEY = 'e-ncrypt-settings';

interface StoredSettings {
  encryptionAlgorithm: EncryptionAlgorithmOptions;
  encryptionRounds: number;
  hashingAlgorithm: HashingAlgorithmOptions;
  hashingRounds: number;
  darkMode: boolean;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly encryptionAlgorithm = signal<EncryptionAlgorithmOptions>(
    EncryptionAlgorithms.AES,
  );
  readonly encryptionRounds = signal(1);
  readonly hashingAlgorithm = signal<HashingAlgorithmOptions>(
    HashingAlgorithms.SHA512,
  );
  readonly hashingRounds = signal(1);
  readonly darkMode = signal(false);

  constructor() {
    this.loadFromStorage();
    this.watchSystemDarkMode();

    effect(() => {
      if (!this.isBrowser) {
        return;
      }

      document.documentElement.classList.toggle('dark', this.darkMode());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot()));
    });
  }

  setDarkModeEnabled(enabled: boolean): void {
    this.darkMode.set(enabled);
  }

  private snapshot(): StoredSettings {
    return {
      encryptionAlgorithm: this.encryptionAlgorithm(),
      encryptionRounds: this.encryptionRounds(),
      hashingAlgorithm: this.hashingAlgorithm(),
      hashingRounds: this.hashingRounds(),
      darkMode: this.darkMode(),
    };
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    const preferredDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.darkMode.set(preferredDark);
        return;
      }

      const stored = JSON.parse(raw) as StoredSettings;
      this.encryptionAlgorithm.set(stored.encryptionAlgorithm);
      this.encryptionRounds.set(stored.encryptionRounds);
      this.hashingAlgorithm.set(stored.hashingAlgorithm);
      this.hashingRounds.set(stored.hashingRounds);
      this.darkMode.set(stored.darkMode);
    } catch {
      this.darkMode.set(preferredDark);
    }
  }

  private watchSystemDarkMode(): void {
    if (!this.isBrowser) {
      return;
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        this.darkMode.set(event.matches);
      });
  }
}
