import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocDetailComponent } from './doc-detail.component';
import { DocDetailRoutingModule } from './doc-detail-routing.module';
import { DxButtonModule } from 'devextreme-angular';
import { DocInfoModule } from 'src/common/component/doc-info/doc-info.module';



@NgModule({
  declarations: [DocDetailComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DocDetailRoutingModule,
    DocInfoModule
  ]
})
export class DocDetailModule { }
