import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupUploadComponent } from './popup-upload.component';
import { DxPopupModule } from 'devextreme-angular';



@NgModule({
  declarations: [PopupUploadComponent],
  imports: [
    CommonModule,
    DxPopupModule
  ],
  exports: [PopupUploadComponent]
})
export class PopupUploadModule { }
