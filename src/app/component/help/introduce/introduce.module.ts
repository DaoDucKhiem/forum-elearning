import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduceComponent } from './introduce.component';



@NgModule({
  declarations: [IntroduceComponent],
  imports: [
    CommonModule
  ],
  exports: [IntroduceComponent]
})
export class IntroduceModule { }
