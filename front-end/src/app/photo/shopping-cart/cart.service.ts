import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Photo } from "src/app/model/photo";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cart: Photo[];
  private cartUpdated = new Subject<Photo[]>();

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient) {}

  getCarts(userId) {
    this.http
      .get<{ message: string; cart: Photo[] }>(
        this.baseUrl + "/cart/get/" + userId
      )
      .subscribe(cartItems => {
        if (!cartItems) {
          this.cart = [];
        }

        this.cart = cartItems.cart;
        this.cartUpdated.next([...this.cart]);
      });
  }

  getCartUpdated() {
    return this.cartUpdated.asObservable();
  }
}
