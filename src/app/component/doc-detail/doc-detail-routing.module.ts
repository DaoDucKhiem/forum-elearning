import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocDetailComponent } from './doc-detail.component';


const routes: Routes = [
  {
    path: "",
    component: DocDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocDetailRoutingModule { }
