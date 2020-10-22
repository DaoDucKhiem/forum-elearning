import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentManagementComponent } from './document-management.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [DocumentManagementComponent],
  imports: [
    CommonModule,
    DxDataGridModule
  ],
  exports: [DocumentManagementComponent]
})
export class DocumentManagementModule { }
