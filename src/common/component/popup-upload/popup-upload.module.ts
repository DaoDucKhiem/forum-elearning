import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupUploadComponent } from './popup-upload.component';
import { DxButtonModule, DxPopupModule, DxScrollViewModule, DxTextAreaModule } from 'devextreme-angular';
import { UploadDirective } from 'src/app/share/directive/upload';
import { SelectBoxModule } from 'src/app/share/module/select-box/select-box.module';
import { TextBoxModule } from 'src/app/share/module/text-box/text-box.module';



@NgModule({
  declarations: [PopupUploadComponent, UploadDirective],
  imports: [
    CommonModule,
    DxPopupModule,
    DxButtonModule,
    DxScrollViewModule,
    DxTextAreaModule,
    SelectBoxModule,
    TextBoxModule
  ],
  exports: [PopupUploadComponent]
})
export class PopupUploadModule { }
