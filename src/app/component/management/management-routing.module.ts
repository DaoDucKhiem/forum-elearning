import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';


const routes: Routes = [
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: "document",
        loadChildren: ()=> import('../document/document.module').then(x=>x.DocumentModule)
      },
      {
        path: "doc-detail",
        loadChildren: ()=> import('../doc-detail/doc-detail.module').then(x=>x.DocDetailModule)
      },
      {
        path: "",
        redirectTo: "document",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
