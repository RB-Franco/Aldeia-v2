import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmitirPedidoComponent } from './emitir-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: EmitirPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmitirPedidoRoutingModule { }
