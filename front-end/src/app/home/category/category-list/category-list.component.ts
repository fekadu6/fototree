import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { AuthService } from "src/app/account/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CartService } from "src/app/photo/shopping-cart/cart.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() photo: Photo[];
  loggedIn: boolean;
  userStateSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        this.loggedIn = userState.token ? true : false;
        console.log("Logged in user", userState);
      });
  }

  addToCart(photo) {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        this.loggedIn = userState.token ? true : false;

        if (!this.loggedIn) {
          this.router.navigate(["/signin"]);
        } else {
          this.cartService.addToCart(photo);
        }
      });
  }
  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
