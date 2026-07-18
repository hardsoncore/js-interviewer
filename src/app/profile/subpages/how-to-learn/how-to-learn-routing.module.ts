import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToLearnPage } from './how-to-learn.page';

const routes: Routes = [
  {
    path: '',
    component: HowToLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToLearnPageRoutingModule {}
