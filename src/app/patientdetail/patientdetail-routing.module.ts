import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientdetailPage } from './patientdetail.page';

const routes: Routes = [
  {
    path: '',
    component: PatientdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientdetailPageRoutingModule {}
