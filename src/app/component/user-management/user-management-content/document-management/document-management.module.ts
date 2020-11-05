import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentManagementComponent } from './document-management.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [DocumentManagementComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule
  ],
  exports: [DocumentManagementComponent]
})
export class DocumentManagementModule { }
