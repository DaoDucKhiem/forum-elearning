import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocDetailComponent } from './doc-detail.component';
import { DocDetailRoutingModule } from './doc-detail-routing.module';



@NgModule({
  declarations: [DocDetailComponent],
  imports: [
    CommonModule,
    DocDetailRoutingModule
  ]
})
export class DocDetailModule { }
