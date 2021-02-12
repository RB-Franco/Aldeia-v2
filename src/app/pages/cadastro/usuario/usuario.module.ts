import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [UsuarioComponent]
})
export class UsuarioModule { }
