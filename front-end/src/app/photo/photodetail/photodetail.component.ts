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
  email: String;
  photoID: any;
  routeParamsSub: any;
  data;
  za = "Zaaaa";

  constructor(
    private route: ActivatedRoute,
    public photoService: PhotodetailService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.photoID = "5d8911055fb8813eb0ae8a0d";
    this.email = "firstlast@gmail.com";

    //read ids from url
    this.routeParamsSub = this.route.params.subscribe(params => {
      //this.userID = params["user_id"];
      //this.photoID = params["photo_id"];
    });
    //send user id and photo id to server and return photo details object
    this.photoService
      .getPhotoDetails(this.email, this.photoID)
      .subscribe(response => {
        this.data = response;
        console.log(response);
        // console.log("first name: " + response.fname);
        // console.log("last name: " + response.lname);
        // console.log("email: " + response.photo_likes);
      });
  }
  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }
}
