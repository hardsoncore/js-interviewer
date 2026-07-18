import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

interface LearnStep {
  icon: string;
  color: string;
  title: string;
  text: string;
}

@Component({
    selector: 'app-how-to-learn',
    templateUrl: './how-to-learn.page.html',
    styleUrls: ['./how-to-learn.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule]
})
export class HowToLearnPage {
  steps: LearnStep[] = [
    {
      icon: 'book',
      color: 'primary',
      title: 'Pass 1 — read the Cores',
      text: 'Every answer starts with a Core: the 1–2 minute spoken version — definition, key idea, a minimal example, classic pitfalls. That is exactly what interviewers expect to hear first, so simply read the Cores topic by topic.',
    },
    {
      icon: 'mic',
      color: 'secondary',
      title: 'Rehearse out loud in the Quiz',
      text: 'Answer every question aloud, as if the interviewer were already in the room. Then open the answer structure and honestly tick only the points you actually said — anything below 100% will keep coming back until you own it.',
    },
    {
      icon: 'layers',
      color: 'tertiary',
      title: 'Pass 2 — unfold the Deep Dives',
      text: 'Once the Cores feel easy, open the Deep Dives: under-the-hood mechanics, edge cases and senior-level details for when the interviewer starts digging.',
    },
    {
      icon: 'flame',
      color: 'warning',
      title: '15 minutes a day is enough',
      text: 'Cores are phone-sized on purpose — perfect for a commute or a coffee queue. A short daily session beats any cramming marathon and keeps your streak alive.',
    },
    {
      icon: 'moon',
      color: 'success',
      title: 'Pass 3 — the night before',
      text: 'Skim the Cores one last time and run the Quiz in random order as a final dress rehearsal. Then walk in and nail the first 90 seconds of every answer.',
    },
  ];
}
