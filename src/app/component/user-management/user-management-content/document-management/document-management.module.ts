import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentManagementComponent } from './document-management.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';
import { PopupUploadModule } from 'src/common/component/popup-upload/popup-upload.module';
import { SelectBoxModule } from 'src/app/share/module/select-box/select-box.module';
import { TextBoxModule } from 'src/app/share/module/text-box/text-box.module';

@NgModule({
  declarations: [DocumentManagementComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    PopupUploadModule,
    DxTextAreaModule,
    SelectBoxModule,
    TextBoxModule
  ],
  exports: [DocumentManagementComponent]
})
export class DocumentManagementModule { }
