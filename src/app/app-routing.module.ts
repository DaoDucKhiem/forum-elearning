import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./component/management/management.module').then(m => m.ManagementModule)
  },
  {
    path: '',
    loadChildren: () => import('./component/account-management/account-management.module').then(m => m.AccountManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
