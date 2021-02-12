import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaPedidoRoutingModule } from './consulta-pedido-routing.module';
import { ConsultaPedidoComponent } from './consulta-pedido.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ConsultaPedidoRoutingModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [ConsultaPedidoComponent]
})
export class ConsultaPedidoModule { }
