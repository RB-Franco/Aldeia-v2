import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoDetalheComponent } from './catalogo-detalhe.component'

const routes: Routes = [

  {
    path:'',
    component: CatalogoDetalheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
