import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../theme/shared/shared.module';

import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { VendasComponent } from './vendas.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { DetalhePedidoComponent } from './detalhe-pedido/detalhe-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: VendasComponent,
    children: [
      {
        path: 'consultar-pedido',
        component: ConsultaPedidoComponent,
      },
      {
        path: 'detalhe-pedido/:id',
        component: DetalhePedidoComponent
      },
      {
        path: 'emitir/detalhe-pedido',
        component: DetalhePedidoComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
          hasBackdrop: true,
          panelClass: 'm-mat-dialog-container__wrapper',
          height: 'auto',
          width: '900px'
      }
  }],
  exports: [RouterModule],
  declarations: [
    VendasComponent,
    ConsultaPedidoComponent, 
    DetalhePedidoComponent
  ]
})
export class VendasModule { }

window.onunload = () => {
  //localStorage.clear();
}