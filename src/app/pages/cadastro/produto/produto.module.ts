import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [ProdutoComponent]
})
export class ProdutoModule { }
