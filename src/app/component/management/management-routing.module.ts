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
        loadChildren: () => import('../document/document.module').then(x => x.DocumentModule)
      },
      {
        path: "user",
        loadChildren: () => import('../user-management/user-management.module').then(x => x.UserManagementModule)
      },
      {
        path: "help",
        loadChildren: () => import('../help/help.module').then(x => x.HelpModule)
      },
      {
        path: ":id",
        loadChildren: () => import('../doc-detail/doc-detail.module').then(x => x.DocDetailModule)
      },
      {
        path: "",
        redirectTo: "document",
        pathMatch: "full"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
