import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBoxComponent } from './select-box.component';
import { DxSelectBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [SelectBoxComponent],
  imports: [
    CommonModule,
    DxSelectBoxModule
  ],
  exports: [SelectBoxComponent]
})
export class SelectBoxModule { }
