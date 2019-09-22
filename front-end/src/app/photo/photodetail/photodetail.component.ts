import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.css']
})
export class PhotodetailComponent implements OnInit, OnDestroy {
  photoId: any;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //read photo id from url
    this.sub = this.route.params.subscribe(params => {
      this.photoId = params["_id"];
    });

    //send photo id to server and return author object



  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
