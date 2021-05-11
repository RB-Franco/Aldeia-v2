import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComunicacaoBaseService } from '../../services/comunicationService/comunicacao-base.service';
import { GenericServices } from '../../services/comunicationService/generic-services';
import { ListaInfiniteScrollAcoesHelper } from './lista-infinite-scroll-acoes-helper';
import { ListaInfiniteScrollColunasHelper } from './lista-infinite-scroll-colunas-helper';
// import { dateToString } from '../../utils/date';

@Component({
  selector: 'mx-lista-infinite-scroll',
  templateUrl: './lista-infinite-scroll.component.html',
  styleUrls: ['./lista-infinite-scroll.component.scss']
})
export class ListaInfiniteScrollComponent implements OnInit {
  @Input() colunas: ListaInfiniteScrollColunasHelper[] = [];
  @Input() acoes: ListaInfiniteScrollAcoesHelper[] = [];
  @Input() metodoPesquisa = '/pesquisar';
  @Input() servico = '';
  @Input() filtros: any = {};
  @Input() semPaginacao = false;
  @Input() funcaoAjusteDeParametros: any;
  @Input() colunaOrdenacao: string;
  @Input() genericServices: GenericServices;
  @Input() exibirLoading = false;
  @Input() servicoSalvarGrid = '';
  @Input() nomeGrid = '';
  @Input() dataSource: any;
  @Output() aoSelecionarLinha = new EventEmitter();
  @Output() gravarColunas = new EventEmitter();
  @Output() aoCarregarDados = new EventEmitter();
  @Output() onChangeColunaEditavel = new EventEmitter();
  @Input() tamanho ='';
  
  @ViewChild('lista', {static: true}) el: any;

  readonly headerHeight = 40;
  readonly rowHeight = 40;
  readonly pageLimit = 25;
  quantidadeMaxima = 0;
  direcaoOrdenacao = 'ASCENDING';
  messages = { emptyMessage: `Nenhum resultado foi encontrado!` };

  messagesReconsultando = { emptyMessage: `` };
  reconsutando = true;

  rows: any[] = [];
  isLoading: boolean;
  selected = [];
  naoEncontrouColunaAcoes = false;
  colunasOrdenadas: any[];
  temFooter = false;
  footerHeight = 0;
  bkpColunas: any[];
  
  constructor(
     private comunicacao: ComunicacaoBaseService
    ) { 

      this.colunas = [];
      this.acoes = [];
      this.servico = '';
      this.filtros= {};
      this.semPaginacao = false;
      this.colunaOrdenacao= '';    
      this.exibirLoading = false;
      this.servicoSalvarGrid = '';
      this.nomeGrid = '';
      this.dataSource = [];
      this.tamanho ='';
    }

  ngOnInit() {
    if (!this.colunaOrdenacao) { this.colunaOrdenacao = this.colunas[0].propriedade; }
    this.naoEncontrouColunaAcoes = this.colunas.filter(x => x.titulo === 'Ações').length === 0;
    this.temFooter = this.colunas.some(c => c.hasOwnProperty('footer'));
    if (this.temFooter) {
      this.footerHeight = 50;
      this.bkpColunas = [...this.colunas];
    }

    this.pesquisar();
  }

  pesquisar() {
    this.rows = [];
    this.onScroll(0);
  }

  removerItem(item) {

    this.rows = this.rows.filter(m => m !== item);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
  }

  onScroll(offsetY: number) {

    if (this.semPaginacao && this.rows.length > 0) { return; }

    const viewHeight = (this.el as any).element.getBoundingClientRect().height - this.headerHeight;

    if (!this.isLoading &&
      offsetY + viewHeight >= this.rows.length * this.rowHeight) {

      let limit = this.pageLimit;

      if (this.rows.length === 0) {

        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        limit = Math.max(pageSize, this.pageLimit);
      }

      this.loadPage(100);
     }
  }

   private loadPage(limit: number) {

  //   if (this.quantidadeMaxima > 0 && this.rows.length === this.quantidadeMaxima) { return; }

    this.isLoading = true;    
    if (this.dataSource.length > 0) {
      const rows = [...this.rows, ...this.dataSource];
      this.quantidadeMaxima = this.dataSource.length;
      this.rows = rows;
      this.rows.forEach( row => {row.rowValue = 0});
      this.configureDataSource(this.dataSource.length === 0, false);
      this.aoCarregarDados.emit();
      return;
    }

    this.getResults(this.rows.length, limit)
      .then(results => {
        const renderizarScroll = this.rows.length === 0;
        this.quantidadeMaxima = 5;
        const rows = [...this.rows, ...results.data];
        this.rows = rows;
        this.rows.forEach( row => {row.rowValue = 0});
        this.configureDataSource(renderizarScroll, false);
        this.aoCarregarDados.emit();
      });
  }

  configureDataSource(renderizarScroll, isLoading = false) {
    setTimeout(() => {
      this.isLoading = isLoading;

      window.dispatchEvent(new Event('resize'));
      const scroll = this.el.element.querySelector('datatable-body');
      if (renderizarScroll) { scroll.scrollTop = 2; }

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        if (renderizarScroll) { scroll.scrollTop = 1; }
      }, 100);
    }, 100);
  }

  getResults(indiceAtual: number, limite: number): Promise<any> {
    if (!this.filtros) { this.filtros = {}; }

    if (!this.semPaginacao) {
      this.filtros.campoOrdenacao = this.colunaOrdenacao;
      this.filtros.tamanhoPagina = limite;
      this.filtros.indicePrimeiroRegistroPagina = indiceAtual || 1;
      this.filtros.tipoOrdenacao = this.direcaoOrdenacao;
    }

    // for (const propriedade in this.filtros) {
    //   if (this.filtros.hasOwnProperty(propriedade)) {
    //     if (!this.filtros[propriedade]) {
    //       if (this.filtros[propriedade] !== '0') { delete this.filtros[propriedade]; }
    //     }
    //   }
    // }

    if (this.funcaoAjusteDeParametros) { this.funcaoAjusteDeParametros(this.filtros); }
    if (this.genericServices) {
      return this.genericServices.get(this.metodoPesquisa, {
        dados: this.filtros,
        exibirLoading: false
      }).toPromise();
    } else {
      return this.comunicacao.get(`${this.servico}`, {
        dados: this.converterDatasFormatoApi(this.filtros),
        exibirLoading: this.exibirLoading
      });
    }
  }

  converterDatasFormatoApi(filtros: any): any {
    let filtroFormatado: any;
    filtroFormatado = Object.create(filtros);
    Object.assign(filtroFormatado, filtros);
    for (const propr in filtroFormatado) {
      if (filtroFormatado.hasOwnProperty(propr)) {
        if (filtroFormatado[propr] && filtroFormatado[propr] instanceof Date) {
          filtroFormatado[propr] = (filtroFormatado[propr].getTime());
        }
      }
    }
    return filtroFormatado;
  }

  onSort(event) {
    if (this.semPaginacao) { return; }

    this.direcaoOrdenacao = event.newValue === 'desc' ? 'DESCENDING' : 'ASCENDING';
    this.colunaOrdenacao = event.column.prop;

    this.rows = [];
    this.reconsutando = true;
    this.onScroll(0);
    this.reconsutando = false;
  }

  onSelect({ selected }) {
    if (selected === undefined)
      return;

    if (selected.length > 0) {
      this.aoSelecionarLinha.emit(selected[0]);
    }
  }

  retornaDados() {
    return this.rows;
  }

  retornaDadosFooter(): string {
    const colunasComFooter = this.bkpColunas.filter(c => c.footer);
    const dadosFooter = [];
    let valor = 0;

    dadosFooter.push(`Total de registros: ${this.rows.length}`);

    colunasComFooter.forEach(col => {
      let texto = '';

      switch (col.footer.tipo) {
        case 'media':
          valor = this.rows.length === 0 ?
            0 :
            this.rows.map(row => row[col.propriedade]).reduce((res, cell) => res += cell, 0) / this.rows.length;

          texto = 'Média de';
          break;
        case 'soma':
          valor = this.rows.map(row => row[col.propriedade]).reduce((res, cell) => res += cell, 0);
          texto = 'Somatória de';
          break;
      }

      texto += ` "${col.titulo}": `;

      switch (col.footer.formatacao) {
        case '%':
          texto += Number.parseFloat(valor.toString()).toFixed(2) + ' %';
          break;
        case '$':
          texto += Number.parseFloat(valor.toString()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          break;
        default:
          texto += valor.toFixed(2);
      }

      dadosFooter.push(texto);
    });

    return dadosFooter.join('    |    ');
  }
}
