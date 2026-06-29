import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { Listbox, Option } from '@angular/aria/listbox';
import { ClipboardService } from '../../core/services/clipboard.service';
import { CryptoService } from '../../core/services/crypto.service';
import { SettingsService } from '../../core/services/settings.service';

type EncryptMode = 'encrypt' | 'decrypt';

interface EncryptModel {
  mode: EncryptMode;
  key: string;
  content: string;
}

@Component({
  selector: 'app-encrypt',
  imports: [FormField, Listbox, Option],
  template: `
    <section class="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-balance">
          Encryption
          <span class="text-base font-normal text-muted">
            ({{ settings.encryptionAlgorithm() }})
          </span>
        </h1>
        <p class="mt-1 text-sm text-muted">
          Encrypt or decrypt content locally using your password.
        </p>
      </div>

      <ul
        ngListbox
        [(value)]="modeSelection"
        [multi]="false"
        selectionMode="explicit"
        orientation="horizontal"
        aria-label="Encryption mode"
        class="inline-flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800"
      >
        <li
          ngOption
          value="encrypt"
          label="Encrypt"
          class="mode-toggle"
          [class.mode-toggle-active]="encryptModel().mode === 'encrypt'"
        >
          Encrypt
        </li>
        <li
          ngOption
          value="decrypt"
          label="Decrypt"
          class="mode-toggle"
          [class.mode-toggle-active]="encryptModel().mode === 'decrypt'"
        >
          Decrypt
        </li>
      </ul>

      <form class="space-y-4" (submit)="$event.preventDefault()">
        <div class="space-y-2">
          <label for="encrypt-key" class="text-sm font-medium">Password</label>
          <input
            id="encrypt-key"
            type="password"
            placeholder="Min. 5 characters"
            class="field-input"
            [class.field-input-error]="
              encryptForm.key().invalid() && encryptForm.key().touched()
            "
            [formField]="encryptForm.key"
          />
          @if (encryptForm.key().invalid() && encryptForm.key().touched()) {
            <p class="text-sm text-danger">
              Password must be at least 5 characters.
            </p>
          }
        </div>

        <div class="space-y-2">
          <label for="encrypt-content" class="text-sm font-medium">Content</label>
          <textarea
            id="encrypt-content"
            rows="8"
            class="field-input min-h-40 resize-y"
            [class.field-input-error]="
              encryptForm.content().invalid() && encryptForm.content().touched()
            "
            [placeholder]="contentPlaceholder()"
            [formField]="encryptForm.content"
          ></textarea>
          @if (
            encryptForm.content().invalid() && encryptForm.content().touched()
          ) {
            <p class="text-sm text-danger">Content is required.</p>
          }
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            class="btn-secondary"
            [disabled]="!encryptModel().content"
            (click)="copyContent()"
          >
            Copy content
          </button>

          @if (encryptModel().mode === 'encrypt') {
            <button
              type="button"
              class="btn-primary"
              [disabled]="!encryptForm().valid()"
              (click)="runEncrypt()"
            >
              Encrypt
            </button>
          } @else {
            <button
              type="button"
              class="btn-danger"
              [disabled]="!encryptForm().valid()"
              (click)="runDecrypt()"
            >
              Decrypt
            </button>
          }
        </div>

        <button
          type="button"
          class="btn-secondary w-full"
          [disabled]="!encryptModel().content"
          (click)="clearContent()"
        >
          Clear content
        </button>
      </form>
    </section>
  `,
})
export class EncryptComponent {
  protected readonly settings = inject(SettingsService);
  private readonly crypto = inject(CryptoService);
  private readonly clipboard = inject(ClipboardService);

  protected readonly encryptModel = signal<EncryptModel>({
    mode: 'encrypt',
    key: '',
    content: '',
  });

  protected readonly encryptForm = form(this.encryptModel, (fields) => {
    required(fields.key);
    minLength(fields.key, 5);
    required(fields.content);
  });

  protected modeSelection = model<EncryptMode[]>(['encrypt']);

  protected readonly contentPlaceholder = computed(() =>
    this.encryptModel().mode === 'encrypt'
      ? 'Enter content to encrypt'
      : 'Enter content to decrypt',
  );

  constructor() {
    effect(() => {
      const mode = this.modeSelection()[0];
      if (!mode) {
        return;
      }

      this.encryptModel.update((current) =>
        current.mode === mode ? current : { ...current, mode },
      );
    });
  }

  protected runEncrypt(): void {
    this.encryptForm().markAsTouched();
    if (!this.encryptForm().valid()) {
      return;
    }

    const model = this.encryptModel();
    const encrypted = this.crypto.encrypt(
      model.content,
      model.key,
      this.settings.encryptionAlgorithm(),
      this.settings.encryptionRounds(),
    );

    this.encryptModel.update((current) => ({
      ...current,
      mode: 'decrypt',
      content: encrypted,
    }));
    this.modeSelection.set(['decrypt']);
  }

  protected runDecrypt(): void {
    this.encryptForm().markAsTouched();
    if (!this.encryptForm().valid()) {
      return;
    }

    const model = this.encryptModel();
    const decrypted = this.crypto.decrypt(
      model.content,
      model.key,
      this.settings.encryptionAlgorithm(),
      this.settings.encryptionRounds(),
    );

    this.encryptModel.update((current) => ({
      ...current,
      mode: 'encrypt',
      content: decrypted,
    }));
    this.modeSelection.set(['encrypt']);
  }

  protected clearContent(): void {
    this.encryptModel.update((current) => ({ ...current, content: '' }));
  }

  protected copyContent(): void {
    void this.clipboard.copy(this.encryptModel().content);
  }
}
