import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupUploadComponent } from './popup-upload.component';
import { DxPopupModule, DxScrollViewModule, DxTextAreaModule } from 'devextreme-angular';
import { UploadDirective } from 'src/app/share/directive/upload';



@NgModule({
  declarations: [PopupUploadComponent, UploadDirective],
  imports: [
    CommonModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTextAreaModule
  ],
  exports: [PopupUploadComponent]
})
export class PopupUploadModule { }
