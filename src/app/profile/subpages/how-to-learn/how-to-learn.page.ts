import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

interface LearnStep {
  icon: string;
  color: string;
  titleKey: string;
  textKey: string;
}

@Component({
    selector: 'app-how-to-learn',
    templateUrl: './how-to-learn.page.html',
    styleUrls: ['./how-to-learn.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, TranslatePipe]
})
export class HowToLearnPage {
  steps: LearnStep[] = [
    {
      icon: 'book',
      color: 'primary',
      titleKey: 'HOW_TO_LEARN.STEPS.S1.TITLE',
      textKey: 'HOW_TO_LEARN.STEPS.S1.TEXT',
    },
    {
      icon: 'mic',
      color: 'secondary',
      titleKey: 'HOW_TO_LEARN.STEPS.S2.TITLE',
      textKey: 'HOW_TO_LEARN.STEPS.S2.TEXT',
    },
    {
      icon: 'layers',
      color: 'tertiary',
      titleKey: 'HOW_TO_LEARN.STEPS.S3.TITLE',
      textKey: 'HOW_TO_LEARN.STEPS.S3.TEXT',
    },
    {
      icon: 'flame',
      color: 'warning',
      titleKey: 'HOW_TO_LEARN.STEPS.S4.TITLE',
      textKey: 'HOW_TO_LEARN.STEPS.S4.TEXT',
    },
    {
      icon: 'moon',
      color: 'success',
      titleKey: 'HOW_TO_LEARN.STEPS.S5.TITLE',
      textKey: 'HOW_TO_LEARN.STEPS.S5.TEXT',
    },
  ];
}
