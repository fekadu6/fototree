import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CartService } from "../cart.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/account/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: Photo[];
  subTotal: number = 0;
  total: number = 0;
  tax: number = 0.07;

  cartItemSubscription = new Subscription();
  userStateSubscription = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartItems();
  }

  getSubTotal() {
    console.log("Items before reduce:", this.cartItems);
    return this.cartItems.reduce((preVal, curVal) => preVal + curVal.price, 0);
  }

  getOrderTotal() {
    const subTotal = this.getSubTotal();
    return this.tax * subTotal + subTotal;
  }

  getTax() {
    return this.tax * this.getSubTotal();
  }

  getCartItems() {
    //this.cartService.getCarts();
    this.cartItemSubscription = this.cartService
      .getCartUpdated()
      .subscribe(carts => {
        console.log("Cart items:", carts);
        this.cartItems = carts;
      });
  }

  ngOnDestroy() {
    this.cartItemSubscription.unsubscribe();
    this.userStateSubscription.unsubscribe();
  }

  addBoughtPhotos() {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        const photoDetail = {
          userId: userState.userId,
          photos: this.cartItems
        };

        console.log("Photo detail: ", photoDetail);
        this.cartService.addBoughtPhotos(photoDetail);

        this.router.navigate(["/checkout-confirmation"]);
      });
  }
}
