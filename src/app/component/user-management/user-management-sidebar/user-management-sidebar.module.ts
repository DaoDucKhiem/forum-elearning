import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementSidebarComponent } from './user-management-sidebar.component';



@NgModule({
  declarations: [UserManagementSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [UserManagementSidebarComponent]
})
export class UserManagementSidebarModule { }
