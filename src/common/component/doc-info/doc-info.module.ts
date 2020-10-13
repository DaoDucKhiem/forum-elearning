import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocInfoComponent } from './doc-info.component';



@NgModule({
  declarations: [DocInfoComponent],
  imports: [
    CommonModule
  ],
  exports: [DocInfoComponent]
})
export class DocInfoModule { }
