import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';



@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule
  ],
  exports: [SecurityComponent]
})
export class SecurityModule { }
