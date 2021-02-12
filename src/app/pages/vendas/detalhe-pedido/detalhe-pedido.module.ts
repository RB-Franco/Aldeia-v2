import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalhePedidoRoutingModule } from './detalhe-pedido-routing.module';
import { DetalhePedidoComponent } from './detalhe-pedido.component';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DetalhePedidoRoutingModule,
    SharedModule
  ],
  declarations: [DetalhePedidoComponent]
})
export class DetalhePedidoModule { }
