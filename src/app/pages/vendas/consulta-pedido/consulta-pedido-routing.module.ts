import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaPedidoComponent} from './consulta-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPedidoRoutingModule { }
