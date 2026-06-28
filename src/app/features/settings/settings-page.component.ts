import { Component } from '@angular/core';
import { SettingsPanelComponent } from './settings-panel.component';

@Component({
  selector: 'app-settings-page',
  imports: [SettingsPanelComponent],
  template: `
    <div class="lg:hidden">
      <app-settings-panel />
    </div>
  `,
})
export class SettingsPageComponent {}
