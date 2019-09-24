import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatDialogModule
} from "@angular/material";

import {MatFileUploadModule} from 'angular-material-fileupload';

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
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatFileUploadModule,
    MatDialogModule
  
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
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatFileUploadModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
