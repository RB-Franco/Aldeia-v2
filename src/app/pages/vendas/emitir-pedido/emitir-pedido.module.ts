import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmitirPedidoRoutingModule } from './emitir-pedido-routing.module';
import { EmitirPedidoComponent } from './emitir-pedido.component';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmitirPedidoRoutingModule,
    SharedModule
  ],
  declarations: [EmitirPedidoComponent]
})
export class EmitirPedidoModule { }
