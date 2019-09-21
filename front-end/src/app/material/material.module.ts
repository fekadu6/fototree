import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class MaterialModule {}
