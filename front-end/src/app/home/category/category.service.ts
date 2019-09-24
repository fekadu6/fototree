import { Injectable } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { HttpClient } from "@angular/common/http";
import { Subscription, Subject } from "rxjs";
import { GlobalItems } from "src/app/model/BASE_URL";
import { PhotoDetails } from "src/app/model/photo_details";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private photos: Photo[] = [];
  photoList$ = new Subject<Photo[]>();

  constructor(private http: HttpClient, private globalItems: GlobalItems) {}

  getPhotos() {
    this.http
      .get(`${this.globalItems.BASE_URL}/photos`)
      .subscribe(fetchedPhotos => {
        if (!fetchedPhotos) {
          this.photos = [];
          return;
        }

        for (let row of fetchedPhotos as PhotoDetails[]) {
          const newPhoto = row.uploaded_photos as Photo[];
          this.photos = newPhoto;
          //console.log("Fetched photos", newPhoto);
        }

        this.photoList$.next([...this.photos]);
      });
  }
}
