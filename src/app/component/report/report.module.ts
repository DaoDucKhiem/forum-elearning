import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import {DxButtonModule, DxPopupModule} from 'devextreme-angular';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class ReportModule { }
