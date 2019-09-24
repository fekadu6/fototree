import { Component, OnInit, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CartService } from "../cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Photo[];
  cartItemSubscription = new Subscription();

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.getCarts();
    this.cartItemSubscription = this.cartService
      .getCartUpdated()
      .subscribe(carts => {
        this.cartItems = carts;
        console.log("Cart items:", carts);
      });
  }

  deletePhoto(photoId) {
    console.log("Delete photo id:", photoId);
    this.cartService.deleteCartItem(photoId);
  }

  ngOnDestroy() {
    this.cartItemSubscription.unsubscribe();
  }
}
