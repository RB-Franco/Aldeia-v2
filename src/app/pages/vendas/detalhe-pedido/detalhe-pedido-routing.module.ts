import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhePedidoComponent } from './detalhe-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: DetalhePedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhePedidoRoutingModule { }
