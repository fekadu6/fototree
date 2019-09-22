import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotodetailComponent } from './photodetail/photodetail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PhotodetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PhotoModule { }
