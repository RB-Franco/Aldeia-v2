import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbPaginationModule, NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { CatalogoDetalheComponent } from './catalogo-detalhe/catalogo-detalhe.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    SharedModule,
    NgbButtonsModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgbCollapseModule,
    MatDialogModule
  ],
  entryComponents: [CatalogoDetalheComponent],
  declarations: [CatalogoComponent, CatalogoDetalheComponent]
})
export class CatalogoModule { }
