import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  EncryptionAlgorithmOptions,
  EncryptionAlgorithms,
  HashingAlgorithmOptions,
  HashingAlgorithms,
} from '../../core/services/crypto.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings-panel',
  imports: [Listbox, Option, RouterLink],
  template: `
    <div class="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <div>
        <h2 class="text-lg font-semibold">Settings</h2>
        <p class="text-sm text-muted">Configure algorithms and appearance.</p>
      </div>

      <section class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-muted">
          Encryption
        </h3>

        <label class="block text-sm font-medium">Algorithm</label>
        <ul
          ngListbox
          [(value)]="encryptionSelection"
          [multi]="false"
          selectionMode="explicit"
          class="space-y-1 rounded-xl border border-slate-200 p-2 dark:border-slate-700"
        >
          @for (option of encryptionOptions; track option.value) {
            <li
              ngOption
              [value]="option.value"
              [label]="option.label"
              class="listbox-option"
              [class.listbox-option-selected]="encryptionSelection().includes(option.value)"
            >
              {{ option.label }}
            </li>
          }
        </ul>

        <label class="block text-sm font-medium">
          Rounds: {{ settings.encryptionRounds() }}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          class="w-full accent-accent"
          [value]="settings.encryptionRounds()"
          (input)="onEncryptionRounds($event)"
        />
      </section>

      <section class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-muted">
          Hashing
        </h3>

        <label class="block text-sm font-medium">Algorithm</label>
        <ul
          ngListbox
          [(value)]="hashingSelection"
          [multi]="false"
          selectionMode="explicit"
          class="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-2 dark:border-slate-700"
        >
          @for (option of hashingOptions; track option.value) {
            <li
              ngOption
              [value]="option.value"
              [label]="option.label"
              class="listbox-option"
              [class.listbox-option-selected]="hashingSelection().includes(option.value)"
            >
              {{ option.label }}
            </li>
          }
        </ul>

        <label class="block text-sm font-medium">
          Rounds: {{ settings.hashingRounds() }}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          class="w-full accent-accent"
          [value]="settings.hashingRounds()"
          (input)="onHashingRounds($event)"
        />
      </section>

      <section class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-muted">
          Appearance
        </h3>
        <label class="flex items-center justify-between gap-3 text-sm">
          <span>Dark mode</span>
          <input
            type="checkbox"
            class="size-5 accent-accent"
            [checked]="settings.darkMode()"
            (change)="onDarkMode($event)"
          />
        </label>
      </section>

      <section class="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
        <a
          routerLink="/settings/about"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          About E-ncrypt
        </a>
      </section>
    </div>
  `,
})
export class SettingsPanelComponent {
  protected readonly settings = inject(SettingsService);

  protected readonly encryptionOptions = [
    { value: EncryptionAlgorithms.AES, label: 'AES' },
    { value: EncryptionAlgorithms.TripleDES, label: 'TripleDES' },
    { value: EncryptionAlgorithms.Rabbit, label: 'Rabbit' },
  ];

  protected readonly hashingOptions = [
    { value: HashingAlgorithms.MD5, label: 'MD5 (unsafe)' },
    { value: HashingAlgorithms.SHA1, label: 'SHA1' },
    { value: HashingAlgorithms.SHA256, label: 'SHA256' },
    { value: HashingAlgorithms.SHA512, label: 'SHA512' },
    { value: HashingAlgorithms.SHA3, label: 'SHA3' },
    { value: HashingAlgorithms.RIPEMD160, label: 'RIPEMD-160' },
  ];

  protected encryptionSelection = signal<EncryptionAlgorithmOptions[]>([
    this.settings.encryptionAlgorithm(),
  ]);

  protected hashingSelection = signal<HashingAlgorithmOptions[]>([
    this.settings.hashingAlgorithm(),
  ]);

  constructor() {
    effect(() => {
      const selected = this.encryptionSelection()[0];
      if (selected && selected !== this.settings.encryptionAlgorithm()) {
        this.settings.encryptionAlgorithm.set(selected);
      }
    });

    effect(() => {
      const selected = this.hashingSelection()[0];
      if (selected && selected !== this.settings.hashingAlgorithm()) {
        this.settings.hashingAlgorithm.set(selected);
      }
    });
  }

  protected onEncryptionRounds(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.settings.encryptionRounds.set(value);
  }

  protected onHashingRounds(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.settings.hashingRounds.set(value);
  }

  protected onDarkMode(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settings.setDarkModeEnabled(checked);
  }
}
