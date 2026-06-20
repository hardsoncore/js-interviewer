import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizPage } from './quiz.page';

import { QuizPageRoutingModule } from './quiz-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        QuizPageRoutingModule,
        QuizPage
    ]
})
export class QuizPageModule {}
