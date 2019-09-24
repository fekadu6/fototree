import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-onephoto',
  templateUrl: './onephoto.component.html',
  styleUrls: ['./onephoto.component.css']
})
export class OnephotoComponent implements OnInit {
  @Input() photo: any;
  constructor() { }

  ngOnInit() {
  }

}
