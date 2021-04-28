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
import { ComunicacaoBaseService } from './services/comunicacao-base.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
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
    ApexChartComponent
  ],
  declarations: [
    DataFilterPipe,
    SpinnerComponent,
    ApexChartComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ApexChartService,
    ComunicacaoBaseService
  ]
})
export class SharedModule { }
