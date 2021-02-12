import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorComponent } from './fornecedor.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule, NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [FornecedorComponent]
})
export class FornecedorModule { }
