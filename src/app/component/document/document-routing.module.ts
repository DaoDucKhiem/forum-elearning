import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentCategoryComponent } from './document-category/document-category.component';
import { DocumentComponent } from './document.component';


const routes: Routes = [
  {
    path: "",
    component: DocumentComponent
  },
  {
    path: "categoryId/:id",
    component: DocumentCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
