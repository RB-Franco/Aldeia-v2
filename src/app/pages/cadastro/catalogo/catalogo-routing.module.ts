import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoDetalheComponent } from './catalogo-detalhe/catalogo-detalhe.component'

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent
  },
  {
    path:'catalogo/catalogoDetalhe',
    component: CatalogoDetalheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
