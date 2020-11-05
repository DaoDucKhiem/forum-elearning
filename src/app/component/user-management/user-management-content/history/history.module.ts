import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule } from 'devextreme-angular';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule
  ],
  exports: [HistoryComponent]
})
export class HistoryModule { }
