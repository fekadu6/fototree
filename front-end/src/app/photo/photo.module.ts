import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { PhotodetailComponent } from "./photodetail/photodetail.component";
import { RouterModule } from "@angular/router";
import { CartComponent } from "./shopping-cart/cart/cart.component";
import { CheckoutComponent } from "./shopping-cart/checkout/checkout.component";
import { CheckoutConfirmationComponent } from "./shopping-cart/checkout-confirmation/checkout-confirmation.component";

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
