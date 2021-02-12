import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'consultar-pedido',
        loadChildren: () => import('./consulta-pedido/consulta-pedido.module').then(module => module.ConsultaPedidoModule)
      },
      {
        path: 'emitir-pedido',
        loadChildren: () => import('./emitir-pedido/emitir-pedido.module').then(module => module.EmitirPedidoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
