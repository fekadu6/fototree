import { Injectable } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { HttpClient } from "@angular/common/http";
import { Subscription, Subject } from "rxjs";
import { GlobalItems } from "src/app/model/BASE_URL";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private photos: Photo[];
  photoList$ = new Subject<Photo>();

  constructor(private http: HttpClient, private globalItems: GlobalItems) {}

  getPhotos() {
    this.http
      .get(`${this.globalItems.BASE_URL}/photos`)
      .subscribe(fetchedPhotos => {
        if (!fetchedPhotos) {
          this.photos = [];
        }

        console.log("Fetched photos", fetchedPhotos);
        // this.photos = photos;
        // this.photoList$.next([...this.photos]);
      });
  }
}
