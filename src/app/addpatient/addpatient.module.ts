import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpatientPageRoutingModule } from './addpatient-routing.module';

import { AddpatientPage } from './addpatient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpatientPageRoutingModule
  ],
  declarations: [AddpatientPage]
})
export class AddpatientPageModule {}
