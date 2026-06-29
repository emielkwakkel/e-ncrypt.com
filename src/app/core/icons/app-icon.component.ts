import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { APP_ICONS, AppIconName } from './app-icons';

@Component({
  selector: 'app-icon',
  imports: [FaIconComponent],
  template: `<fa-icon [icon]="icon()" [class]="class()" [size]="size()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex shrink-0',
    'aria-hidden': 'true',
  },
})
export class AppIconComponent {
  readonly name = input.required<AppIconName>();
  readonly class = input<string>('');
  readonly size = input<'xs' | 'sm' | 'lg' | '1x' | '2x'>('1x');

  protected readonly icon = computed(() => APP_ICONS[this.name()]);
}
