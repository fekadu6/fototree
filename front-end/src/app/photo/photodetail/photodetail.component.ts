import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { PhotodetailService } from "./photodetail.service";

@Component({
  selector: "app-photodetail",
  templateUrl: "./photodetail.component.html",
  styleUrls: ["./photodetail.component.css"]
})
export class PhotodetailComponent implements OnInit, OnDestroy {
  photoID: any;
  userID: any;
  sub: any;
  http: HttpClient;
  photoService: PhotodetailService;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //read ids from url
    this.sub = this.route.params.subscribe(params => {
      this.userID = params["user_id"];
      this.photoID = params["photo_id"];
    });

    //send photo id to server and return photo object
    this.photoService.getPhoto(this.userID, this.photoID);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
