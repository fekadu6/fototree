import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PhotodetailService {
  url = "http://localhost:3000/fototree-api/photodetail";
  myHeaders;
  constructor(public http: HttpClient) {}

  getPhotoDetails(email, photo_id) {
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json");
    return this.http.get(`${this.url}/${email}/${photo_id}`, {
      headers: this.myHeaders
    });
  }
}
