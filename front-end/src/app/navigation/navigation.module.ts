import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { SignupComponent } from "./../account/signup/signup.component";
import { SigninComponent } from "./../account/signin/signin.component";
import { HomeComponent } from "./../home/home.component";
import { CategoryComponent } from "../home/category/category.component";
import { CategoryListComponent } from "../home/category/category-list/category-list.component";
import { MaterialModule } from "../material/material.module";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forChild([
      {
        path: "signup",
        component: SignupComponent
      },
      { path: "signin", component: SigninComponent },
      //{ path: "", redirectTo: "user/signup", pathMatch: "full" },
      {
        path: "home",
        component: HomeComponent
      },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ])
  ]
})
export class NavigationModule {}