import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PhotodetailService {
  url = "http://localhost:3000/fototree-api/photodetail";

  constructor(public http: HttpClient) {}

  getPhotoDetails(email, photo_id) {
    return this.http.get(`${this.url}/${email}/${photo_id}`);
  }
}
