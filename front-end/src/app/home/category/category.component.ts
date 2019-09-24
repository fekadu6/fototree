import { Component, OnInit, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CategoryService } from "./category.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit, OnDestroy {
  photos: Photo[];

  photoListSubscription = new Subscription();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getPhotos();
    this.photoListSubscription = this.categoryService.photoList$.subscribe(
      fetchedPhotos => {
        this.photos = fetchedPhotos;
        //console.log("in Category component", fetchedPhotos);
      }
    );
  }

  ngOnDestroy() {
    this.photoListSubscription.unsubscribe();
  }
}
