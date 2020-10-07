import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DxButtonModule } from 'devextreme-angular';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    DxButtonModule
  ],
  exports: [NavbarComponent]
})
export class ToolbarModule { }
