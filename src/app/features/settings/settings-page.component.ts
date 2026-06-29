import { Component } from '@angular/core';
import { SettingsPanelComponent } from './settings-panel.component';

@Component({
  selector: 'app-settings-page',
  imports: [SettingsPanelComponent],
  template: `
    <div class="lg:hidden">
      <app-settings-panel
        [showEncryption]="true"
        [showHashing]="true"
        [showAppearance]="true"
      />
    </div>
  `,
})
export class SettingsPageComponent {}
