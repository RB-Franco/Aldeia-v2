import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [ClienteComponent]
})
export class ClienteModule { }
