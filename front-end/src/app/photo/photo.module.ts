import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { FileUploadComponent } from "./file-upload/file-upload.component";
import { PhotodetailComponent } from "./photodetail/photodetail.component";
import { RouterModule } from "@angular/router";

import { FileUploadComponent } from "./file-upload/file-upload.component";

@NgModule({
  declarations: [
    FileUploadComponent,
    PhotodetailComponent
    // CartComponent,
    // CheckoutComponent,
    // CheckoutConfirmationComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class PhotoModule {}
