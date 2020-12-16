import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocDetailComponent } from './doc-detail.component';
import { DocDetailRoutingModule } from './doc-detail-routing.module';
import { DxButtonModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';
import { DocInfoModule } from 'src/common/component/doc-info/doc-info.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [DocDetailComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DocDetailRoutingModule,
    DocInfoModule,
    AvatarModule,
    DxPopupModule,
    DxTextAreaModule
  ]
})
export class DocDetailModule { }
