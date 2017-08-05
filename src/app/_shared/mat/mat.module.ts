import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdInputModule,
  MdProgressBarModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdSnackBarModule
} from "@angular/material";

export const MdModules = [
  BrowserAnimationsModule,
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdInputModule,
  MdProgressBarModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdSnackBarModule
];

@NgModule({
  imports: [
    MdModules
  ],
  exports: [
    ...MdModules
  ],
  declarations: []
})
export class MatModule { }
