import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './text-box.component';
import { DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [TextBoxComponent],
  imports: [
    CommonModule,
    DxTextBoxModule
  ],
  exports: [TextBoxComponent]
})
export class TextBoxModule { }
