import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocInfoModule } from 'src/common/component/doc-info/doc-info.module';
import { DocumentCategoryComponent } from './document-category/document-category.component';
import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';



@NgModule({
  declarations: [DocumentComponent, DocumentCategoryComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    DocInfoModule
  ]
})
export class DocumentModule { }
