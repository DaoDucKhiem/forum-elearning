import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module';
import { IntroduceModule } from './introduce/introduce.module';
import { SecurityModule } from './security/security.module';
import { RulesModule } from './rules/rules.module';
import { QuestionModule } from './question/question.module';



@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    IntroduceModule,
    QuestionModule,
    SecurityModule,
    RulesModule
  ]
})
export class HelpModule { }
