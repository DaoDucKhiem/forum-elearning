import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DxButtonModule, DxPopoverModule } from 'devextreme-angular';
import { PopupUploadModule } from 'src/common/component/popup-upload/popup-upload.module';
import { FormsModule } from '@angular/forms';
import { SearchGlobalComponent } from './search-global/search-global.component';



@NgModule({
  declarations: [NavbarComponent, SearchGlobalComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    PopupUploadModule,
    DxPopoverModule,
    FormsModule 
  ],
  exports: [NavbarComponent]
})
export class ToolbarModule { }
