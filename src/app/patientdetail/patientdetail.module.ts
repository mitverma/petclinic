import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientdetailPageRoutingModule } from './patientdetail-routing.module';

import { PatientdetailPage } from './patientdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PatientdetailPageRoutingModule
  ],
  declarations: [PatientdetailPage]
})
export class PatientdetailPageModule {}
