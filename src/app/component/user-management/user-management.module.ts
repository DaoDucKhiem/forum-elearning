import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementContentModule } from './user-management-content/user-management-content.module';
import { UserManagementSidebarModule } from './user-management-sidebar/user-management-sidebar.module';
import { AvatarModule } from 'ngx-avatar';
import { DocInfoModule } from 'src/common/component/doc-info/doc-info.module';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    UserManagementContentModule,
    UserManagementSidebarModule,
    AvatarModule,
    DocInfoModule,
    DxPopupModule,
    DxButtonModule
  ]
})
export class UserManagementModule { }
