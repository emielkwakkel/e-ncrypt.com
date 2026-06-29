import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ClipboardService } from '../../core/services/clipboard.service';
import { CryptoService } from '../../core/services/crypto.service';
import { SettingsService } from '../../core/services/settings.service';

interface HashModel {
  content: string;
}

@Component({
  selector: 'app-hash',
  imports: [FormField],
  template: `
    <section class="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-balance">
          Hashing
          <span class="text-base font-normal text-muted">
            ({{ settings.hashingAlgorithm() }})
          </span>
        </h1>
        <p class="mt-1 text-sm text-muted">
          Generate a hash digest from your content on-device.
        </p>
      </div>

      <form class="space-y-4" (submit)="$event.preventDefault()">
        <div class="space-y-2">
          <label for="hash-content" class="text-sm font-medium">Content</label>
          <textarea
            id="hash-content"
            rows="10"
            placeholder="Enter content to hash"
            class="field-input min-h-48 resize-y"
            [class.field-input-error]="
              hashForm.content().invalid() && hashForm.content().touched()
            "
            [formField]="hashForm.content"
          ></textarea>
          @if (hashForm.content().invalid() && hashForm.content().touched()) {
            <p class="text-sm text-danger">Content is required.</p>
          }
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            class="btn-secondary"
            [disabled]="!hashModel().content"
            (click)="copyContent()"
          >
            Copy content
          </button>
          <button
            type="button"
            class="btn-primary"
            [disabled]="!hashForm().valid()"
            (click)="runHash()"
          >
            Hash
          </button>
        </div>

        <button
          type="button"
          class="btn-secondary w-full"
          [disabled]="!hashModel().content"
          (click)="clearContent()"
        >
          Clear content
        </button>
      </form>
    </section>
  `,
})
export class HashComponent {
  protected readonly settings = inject(SettingsService);
  private readonly crypto = inject(CryptoService);
  private readonly clipboard = inject(ClipboardService);

  protected readonly hashModel = signal<HashModel>({ content: '' });

  protected readonly hashForm = form(this.hashModel, (fields) => {
    required(fields.content);
  });

  protected runHash(): void {
    this.hashForm().markAsTouched();
    if (!this.hashForm().valid()) {
      return;
    }

    const hashed = this.crypto.hash(
      this.hashModel().content,
      this.settings.hashingAlgorithm(),
      this.settings.hashingRounds(),
    );

    this.hashModel.update((current) => ({ ...current, content: hashed }));
  }

  protected clearContent(): void {
    this.hashModel.set({ content: '' });
  }

  protected copyContent(): void {
    void this.clipboard.copy(this.hashModel().content);
  }
}
