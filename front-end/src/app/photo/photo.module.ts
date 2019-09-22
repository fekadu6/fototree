import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { PhotodetailComponent } from "./photodetail/photodetail.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [FileUploadComponent, PhotodetailComponent],
  imports: [CommonModule, RouterModule]
})
export class PhotoModule {}
