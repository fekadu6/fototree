import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotodetailComponent } from './photodetail/photodetail.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PostphotoComponent } from './postphoto/postphoto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewphotoComponent } from './viewphoto/viewphoto.component';
import { ListphotoComponent } from './viewphoto/listphoto/listphoto.component';
import { OnephotoComponent } from './viewphoto/onephoto/onephoto.component';
import { PhotoService } from '../services/photo.service';
import { UploadService } from '../upload/upload.service';



@NgModule({
  declarations: [PhotodetailComponent,PostphotoComponent, ViewphotoComponent, ListphotoComponent, OnephotoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "viewphoto/postphoto", component:PostphotoComponent },
      { path: "viewphoto/viewphoto", component:ListphotoComponent },
      { path: "", redirectTo: "home", pathMatch: "full"}
    ])
  ],
  providers: [PhotoService, UploadService]
})
export class PhotoModule { }

