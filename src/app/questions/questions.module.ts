import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsPage } from './questions.page';

import { QuestionsPageRoutingModule } from './questions-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        QuestionsPageRoutingModule,
        QuestionsPage
    ]
})
export class QuestionsPageModule {}
