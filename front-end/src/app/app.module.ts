import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Router } from "@angular/router";
import { FeaturedComponent } from "./home/featured/featured.component";
import { CategoryListComponent } from "./home/category/category-list/category-list.component";
import { CategoryComponent } from "./home/category/category.component";
import { SearchComponent } from "./navigation/search/search.component";
import { FooterComponent } from "./navigation/footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NavigationModule } from "./navigation/navigation.module";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NavigationModule,
    RouterModule.forRoot([
      { path: "fototree", loadChildren: "./navigation/navigation.module" },
      { path: "**", component: PageNotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
