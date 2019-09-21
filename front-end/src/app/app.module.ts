import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FeaturedComponent } from "./featured/featured.component";
import { CategoryListComponent } from "./featured/category/category-list/category-list.component";
import { CategoryComponent } from "./featured/category/category.component";
import { SearchComponent } from "./navigation/search/search.component";
import { FooterComponent } from "./navigation/footer/footer.component";
import { AccountModule } from "./account/account.module";

@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent,
    FeaturedComponent,
    CategoryListComponent,
    CategoryComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
