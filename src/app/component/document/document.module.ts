import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';
import { DocInfoModule } from 'src/common/component/doc-info/doc-info.module';
import { PopupUploadModule } from 'src/common/component/popup-upload/popup-upload.module';



@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    DocInfoModule,
    PopupUploadModule
  ]
})
export class DocumentModule { }
