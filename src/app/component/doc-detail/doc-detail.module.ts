import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocDetailComponent } from './doc-detail.component';
import { DocDetailRoutingModule } from './doc-detail-routing.module';
import { DxButtonModule } from 'devextreme-angular';



@NgModule({
  declarations: [DocDetailComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DocDetailRoutingModule
  ]
})
export class DocDetailModule { }
