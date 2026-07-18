import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HowToLearnPageRoutingModule } from './how-to-learn-routing.module';

import { HowToLearnPage } from './how-to-learn.page';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      HowToLearnPageRoutingModule,
      HowToLearnPage
    ]
})
export class HowToLearnPageModule {}
