import { Component, OnInit } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CategoryService } from "./category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  category = "Random";
  // photos: string[] = [
  //   "https://images.unsplash.com/photo-1561052630-15412ad90917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1566398484393-54dfba620f06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1568785629399-0cd9324febdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1566624790190-511a09f6ddbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1561052630-15412ad90917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1566398484393-54dfba620f06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1568785629399-0cd9324febdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1566624790190-511a09f6ddbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1552674757-d6dcbaa24cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1552633832-4f5a1b110980?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  // ];

  photos: Photo[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getPhotos();
  }
}
