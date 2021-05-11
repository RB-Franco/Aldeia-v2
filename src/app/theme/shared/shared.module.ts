import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, 
         BreadcrumbModule, 
         CardModule, 
         FilterModule, 
         ModalModule, 
         FormularioAterrissagemModule
        } from './components';

import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { PERFECT_SCROLLBAR_CONFIG, 
         PerfectScrollbarConfigInterface, 
         PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApexChartComponent } from './components/chart/apex-chart/apex-chart.component';
import {ApexChartService} from './components/chart/apex-chart/apex-chart.service';
import { TabelaComSelecaoModule } from './components/tabela-com-selecao/tabela-com-selecao.module';
import { ComunicacaoBaseService } from './services/comunicationService/comunicacao-base.service';
import { UsuarioDetalheComponent } from 'src/app/pages/cadastros/usuario/usuario-detalhe/usuario-detalhe.component';
import { DropdownService } from './services/dropdownService/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastMensagemComponent } from './components/toast-mensagem/toast-mensagem.component';
import { DialogoMensagemComponent } from './components/dialogo-mensagem/dialogo-mensagem.component';
import { DialogoMensagemConfirmComponent } from './components/dialogo-mensagem-confirm/dialogo-mensagem-confirm.component';
import { DialogoMensagemErrorsComponent } from './components/dialogo-mensagem-errors/dialogo-mensagem-errors.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    FilterModule,
    BreadcrumbModule,
    FormularioAterrissagemModule,
    TabelaComSelecaoModule,
    ModalModule,
    ClickOutsideModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    FilterModule,
    FormularioAterrissagemModule,
    TabelaComSelecaoModule,
    BreadcrumbModule,
    ModalModule,
    DataFilterPipe,
    ClickOutsideModule,
    SpinnerComponent,
    ApexChartComponent,
    ToastMensagemComponent,
    DialogoMensagemComponent,
    DialogoMensagemConfirmComponent,
    DialogoMensagemErrorsComponent
  ],
  declarations: [
    DataFilterPipe,
    SpinnerComponent,
    ApexChartComponent,
    ToastMensagemComponent,
    DialogoMensagemComponent,
    DialogoMensagemConfirmComponent,
    DialogoMensagemErrorsComponent
  ],
  entryComponents: [
    ToastMensagemComponent,
    DialogoMensagemComponent,
    DialogoMensagemConfirmComponent,
    DialogoMensagemErrorsComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      
    },
    ApexChartService,
    ComunicacaoBaseService,
    DropdownService
  ]
})
export class SharedModule { }
