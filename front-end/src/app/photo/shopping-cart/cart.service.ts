import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Photo } from "src/app/model/photo";
import { Subject, Subscription } from "rxjs";
import { AuthService } from "src/app/account/auth.service";

@Injectable({
  providedIn: "root"
})
export class CartService implements OnDestroy {
  private cart: Photo[];
  private cartUpdated = new Subject<Photo[]>();
  userStateSubscription = new Subscription();

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCarts() {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        console.log("user state", userState);
        this.http
          .get<{ message: string; cart: Photo[] }>(
            `${this.baseUrl}/cart/get/${userState.userId}`
          )
          .subscribe(cartItems => {
            console.log("user id:", userState.userId);
            console.log("cart items:", cartItems);
            if (!cartItems) {
              this.cart = [];
            }
            this.cart = cartItems.cart;
            this.cartUpdated.next([...this.cart]);
          });
      });
  }

  deleteCartItem(photoId) {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        this.http
          .delete<{ message: string }>(
            `
          ${this.baseUrl}/cart/delete/${userState.userId}/${photoId}`
          )
          .subscribe(response => {
            console.log(response);

            this.getCarts();
          });
      });
  }

  getCartUpdated() {
    return this.cartUpdated.asObservable();
  }

  addBoughtPhotos(photoDetail) {
    this.http
      .post(`${this.baseUrl}/cart/checkout`, photoDetail)
      .subscribe(response => {
        console.log(response);
      });
  }
  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
