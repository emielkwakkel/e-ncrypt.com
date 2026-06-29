import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Listbox, Option } from '@angular/aria/listbox';
import { AppIconComponent } from '../../core/icons/app-icon.component';
import {
  EncryptionAlgorithmOptions,
  EncryptionAlgorithms,
  HashingAlgorithmOptions,
  HashingAlgorithms,
} from '../../core/services/crypto.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings-panel',
  imports: [Listbox, Option, AppIconComponent],
  template: `
    <div class="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <div>
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          <app-icon name="gear" class="size-5 text-accent" />
          {{ panelTitle() }}
        </h2>
        <p class="text-sm text-muted">{{ panelDescription() }}</p>
      </div>

      @if (showEncryption()) {
      <section class="space-y-3">
        <h3
          class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          <app-icon name="eyeSlash" class="size-4" />
          Encryption
        </h3>

        <label class="flex items-center gap-2 text-sm font-medium">
          <app-icon name="squareBinary" class="size-4 text-muted" />
          Algorithm
        </label>
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

        <label class="flex items-center gap-2 text-sm font-medium">
          <app-icon name="arrowsRotate" class="size-4 text-muted" />
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
      }

      @if (showHashing()) {
      <section class="space-y-3">
        <h3
          class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          <app-icon name="hashnode" class="size-4" />
          Hashing
        </h3>

        <label class="flex items-center gap-2 text-sm font-medium">
          <app-icon name="squareBinary" class="size-4 text-muted" />
          Algorithm
        </label>
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

        <label class="flex items-center gap-2 text-sm font-medium">
          <app-icon name="arrowsRotate" class="size-4 text-muted" />
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
      }

      @if (showAppearance()) {
      <section class="space-y-3">
        <h3
          class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          <app-icon name="circleHalfStroke" class="size-4" />
          Appearance
        </h3>
        <label class="flex items-center justify-between gap-3 text-sm">
          <span class="flex items-center gap-2">
            <app-icon name="circleHalfStroke" class="size-4 text-muted" />
            Dark mode
          </span>
          <input
            type="checkbox"
            class="size-5 accent-accent"
            [checked]="settings.darkMode()"
            (change)="onDarkMode($event)"
          />
        </label>
      </section>
      }
    </div>
  `,
})
export class SettingsPanelComponent {
  readonly showEncryption = input(true);
  readonly showHashing = input(true);
  readonly showAppearance = input(true);

  protected readonly settings = inject(SettingsService);

  protected readonly panelTitle = computed(() => {
    if (this.showEncryption() && !this.showHashing() && !this.showAppearance()) {
      return 'Encryption settings';
    }
    if (this.showHashing() && !this.showEncryption() && !this.showAppearance()) {
      return 'Hashing settings';
    }
    return 'Settings';
  });

  protected readonly panelDescription = computed(() => {
    if (this.showEncryption() && !this.showHashing() && !this.showAppearance()) {
      return 'Configure encryption algorithms.';
    }
    if (this.showHashing() && !this.showEncryption() && !this.showAppearance()) {
      return 'Configure hashing algorithms.';
    }
    return 'Configure algorithms and appearance.';
  });

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
