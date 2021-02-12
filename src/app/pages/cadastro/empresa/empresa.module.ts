import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule, NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [EmpresaComponent]
})
export class EmpresaModule { }
