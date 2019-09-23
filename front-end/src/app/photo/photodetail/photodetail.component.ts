import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { PhotodetailService } from "./photodetail.service";

@Component({
  selector: "app-photodetail",
  templateUrl: "./photodetail.component.html",
  styleUrls: ["./photodetail.component.css"]
})
export class PhotodetailComponent {
  //implements OnInit, OnDestroy {
  // photoID: any;
  // userID: any;
  // routeParamsSub: any;
  // http: HttpClient;
  // photoService: PhotodetailService;
  // data: any;
  // constructor(private route: ActivatedRoute) {}
  // ngOnInit() {
  //   //read ids from url
  //   this.routeParamsSub = this.route.params.subscribe(params => {
  //     this.userID = params["user_id"];
  //     this.photoID = params["photo_id"];
  //   });
  //   //send user id and photo id to server and return photo details object
  //   this.photoService
  //     .getPhotoDetails(this.userID, this.photoID)
  //     .subscribe(response => {
  //       this.data = response;
  //     });
  // }
  // ngOnDestroy(): void {
  //   this.routeParamsSub.unsubscribe();
  // }
}
