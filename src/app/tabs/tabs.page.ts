import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule]
})
export class TabsPage {}
