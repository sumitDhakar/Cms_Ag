import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { NgSelectModule } from '@ng-select/ng-select';

const materials=[
  MatSelectModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
  //NgSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materials
  ],exports:[
    materials
  ]
})
export class MaterialModule { }
