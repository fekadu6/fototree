import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PhotodetailService {
  http: HttpClient;
  constructor() {}

  getPhotoDetails(user_id, photo_id) {
    return this.http.get(`/photodetail/${user_id}/${photo_id}`);
  }
}
