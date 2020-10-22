import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementContentComponent } from './user-management-content.component';
import { HistoryModule } from './history/history.module';
import { DocumentManagementModule } from './document-management/document-management.module';
import { CommonInfoModule } from './common-info/common-info.module';



@NgModule({
  declarations: [UserManagementContentComponent],
  imports: [
    CommonModule,
    HistoryModule,
    DocumentManagementModule,
    CommonInfoModule
  ],
  exports: [UserManagementContentComponent]
})
export class UserManagementContentModule { }
