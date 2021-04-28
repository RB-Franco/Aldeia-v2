import { EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimationService, AnimatorModule } from 'css-animator';
import { FormularioAterrissagemComponent } from './formulario-aterrissagem.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListaInfiniteScrollComponent } from '../lista-infinite-scroll/lista-infinite-scroll.component';
import { PortletHeadComponent } from '../portlet-head/portlet-head.component';
import { PortletBodyComponent } from '../portlet-body/portlet-body.component';
import { PortletComponent } from '../portlet/portlet.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    AnimatorModule,
    NgxDatatableModule
  ],
  declarations: [
    FormularioAterrissagemComponent, 
    ListaInfiniteScrollComponent,
    PortletComponent,
    PortletBodyComponent,
    PortletHeadComponent
    ],
  exports: [FormularioAterrissagemComponent],
  providers: [AnimationService]
})
export class FormularioAterrissagemModule {

 }
