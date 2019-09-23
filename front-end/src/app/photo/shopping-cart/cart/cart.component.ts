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
  // = [
  //   new Photo(
  //     "1",
  //     "https://images.unsplash.com/photo-1561052630-15412ad90917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //     "Portrait",
  //     "Beauty is in the eyes of the beholder",
  //     "Some description....",
  //     15,
  //     1000
  //   ),

  //   new Photo(
  //     "2",
  //     "https://images.unsplash.com/photo-1566398484393-54dfba620f06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //     "Portrait",
  //     "Beauty is in the eyes of the beholder",
  //     "Some description....",
  //     10,
  //     1000
  //   ),

  //   new Photo(
  //     "3",
  //     "https://images.unsplash.com/photo-1568785629399-0cd9324febdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //     "Portrait",
  //     "Beauty is in the eyes of the beholder",
  //     "Some description....",
  //     5,
  //     1000
  //   )
  // ];

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.getCartItems("5d865a91f749410facbb699c");
  }

  deletePhoto(id) {
    this.cartItems = this.cartItems.filter((elem, index, arr) => {
      return elem.id !== id;
    });
  }

  getCartItems(userId) {
    this.cartService.getCarts(userId);
    this.cartItemSubscription = this.cartService
      .getCartUpdated()
      .subscribe(carts => (this.cartItems = carts));
  }

  ngOnDestroy() {
    this.cartItemSubscription.unsubscribe();
  }
}
