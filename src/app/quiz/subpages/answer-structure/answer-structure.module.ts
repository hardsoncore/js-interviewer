import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerStructurePageRoutingModule } from './answer-structure-routing.module';

import { AnswerStructurePage } from './answer-structure.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnswerStructurePageRoutingModule,
        AnswerStructurePage
    ]
})
export class AnswerStructurePageModule {}
