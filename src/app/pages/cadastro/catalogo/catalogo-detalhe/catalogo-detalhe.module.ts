import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-detalhe-routing.module';
import {NgbButtonsModule, NgbPaginationModule, NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { CatalogoDetalheComponent } from './catalogo-detalhe.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    NgbButtonsModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgbCollapseModule,
    MatDialogModule
  ],
  declarations: [CatalogoDetalheComponent]
})
export class CatalogoDetalheModule { }
