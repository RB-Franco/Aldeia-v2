import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
//import { ComunicacaoBaseService } from '../services/comunicacao-base.service';
import { isNumber } from 'util';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'mx-tabela-com-selecao',
  templateUrl: './tabela-com-selecao.component.html',
  styleUrls: ['./tabela-com-selecao.component.scss']
})
export class TabelaComSelecaoComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() eventoSelecao = new EventEmitter<any>();
  @Output() eventoAoRemoverSelecaoDeItem = new EventEmitter<any>();
  @Input() colunas: any[];
  @Input() headers: any[];
  @Input() servico: string;
  @Input() camposFiltro: string[] = [];
  @Input() colunaSelect: string;
  @Input() usaFooter: boolean = false;
  @Input() usaSelecao: boolean = true;
  @Input() metodoClick: any;
  @Input() funcaoAjustaModelo: any;
  @Input() carregarServicoNoInicio: boolean = true;
  @Input() selecionarTudoAoInserirDadosTabela: boolean = false;
  @Input() usaPost: boolean = false;
  @Input() set dadosTabela(itens: any[]) {
    if (itens) {
      if (!this.paginado) {
        if (itens.length == 0 && this.modeloSelecao) {
          this.dataSource.data = [];
          this.modeloSelecao.clear();
          return;
        }

        if (!this.ajustouColunasDaGrid) {
          this.preparaColunasDaGrid();
        }

        this.dataSource.data = itens;
        this.dataSource.sort = this.sort;
        this.modeloSelecao = new SelectionModel<any>(true, this.dataSource.data.filter(x => x[this.colunaSelect]), true);

        if (this.selecionarTudoAoInserirDadosTabela) {
          this.alternarSelecaoGeral();
        }
      }
    }
  }

  @Input() set itensSelecionados(itens: any) {
    this.modelo = itens;
    this.marqueItensSelecionados();
  }
  @Input() paginado: boolean = false;
  @Input() pageSizePaginacao: number = 10;
  @Input() showFirstLastButtonsPaginacao: boolean = true;
  @Output() eventoGeralOutput = new EventEmitter<any>();
  @Input() filtros: any = {};
  @Input() cores: any[];
  @Input() utilizaFiltroGeral = false;
  @Input() placeholderFiltroGeral = 'Digite parte do valor para pesquisar';

  ajustouColunasDaGrid: boolean = false;
  modelo: any;
  dataSource: any = new MatTableDataSource<any>();
  modeloSelecao: any;
  tituloColunas: string[] = [];
  tituloHeaders: string[] = [];
  colunasVisiveis: string[] = [];
  lengthPaginacao = 0;
  totalPrevisto = 0;
  totalRealizado = 0;

  constructor(
    //private comunicacao: ComunicacaoBaseService
    ) { }

  ngOnInit() {
    this.preparaColunasDaGrid();
    
    if (this.paginado) {
      this.obtenhaDadosPaginados(0);
    }
    else {
      if (this.carregarServicoNoInicio) {
        this.obtenhaDadosParaTabela({ filtros: this.filtros });
      }
    }

    if (this.eventoGeralOutput) {
      this.eventoGeralOutput.emit();
    }
  }
  obtenhaDadosPaginados(evento){
    if (evento != 0) {
      this.dataSource.data = [];

      if (!this.ajustouColunasDaGrid) {
        this.preparaColunasDaGrid();
      }
    }

    let pagina = evento == 0 ? 0 : evento.pageIndex;
    let filtrosPaginacao = {...this.filtros};
    filtrosPaginacao.paginaAtual = pagina;
    filtrosPaginacao.qtdPaginacao = this.pageSizePaginacao;

    this.obtenhaDadosParaTabela({filtros: filtrosPaginacao}, null, pagina);
  }

  obtemDadosServico(itens, itensSelecionados, pagina = null){
    if (this.paginado) {
      this.dataSource.data = itens.data.listaItens;
    } else {
      this.dataSource.data = itens.lista;
    }

    this.dataSource.sort = this.sort;

    if (this.paginado) {
      if (pagina == 0) {
        this.lengthPaginacao = itens.data.totalItens;
      }
    }
    else {
      if (this.funcaoAjustaModelo) this.funcaoAjustaModelo(this.dataSource.data);

      if (itensSelecionados) {
        this.modelo = itensSelecionados;
        this.marqueItensSelecionados();
      }
    }
  }

  obtenhaDadosParaTabela({ filtros = <any>(null) } = {}, itensSelecionados?: any[], pagina = null) {
    // if (this.servico) {
    //   if (this.usaPost){
    //     this.comunicacao
    //     .post(this.servico, { dados: this.converterDatasFormatoApi(filtros), exibirLoading: true })
    //     .then((itens: any) => {
    //       this.obtemDadosServico(itens, itensSelecionados, pagina);
    //     })
    //     .catch(console.log);
    //   }
    //   else {
    //     this.comunicacao
    //     .get(this.servico, { dados: this.converterDatasFormatoApi(filtros), exibirLoading: true })
    //     .then((itens: any) => {
    //       this.obtemDadosServico(itens, itensSelecionados, pagina);
    //     })
    //     .catch(console.log);
    //   }
    // }
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

  marqueItensSelecionados() {
    if (this.modelo && this.modelo.length > 0 && this.camposFiltro.length > 0) {

      let itensMarcadosComoSelecionadoInicialmente = [].concat(this.dataSource.data);
      this.camposFiltro.forEach(filtro => {
        itensMarcadosComoSelecionadoInicialmente = itensMarcadosComoSelecionadoInicialmente.filter(o => this.modelo.some(m => o[filtro] === m[filtro]));
      });

      this.modeloSelecao = new SelectionModel<any>(true, itensMarcadosComoSelecionadoInicialmente, true);
    }
  }

  esvaziarColunasDaGrid(){
    this.ajustouColunasDaGrid = false;
    this.modeloSelecao = undefined
    this.colunasVisiveis = [];
    this.tituloColunas = [];
    this.tituloHeaders = [];
  }

  preparaColunasDaGrid() {
    if (this.ajustouColunasDaGrid) return;

    if (!this.colunaSelect && this.usaSelecao) this.colunaSelect = 'select';

    if (!this.colunas)
      this.colunas = [
        { titulo: "Codigo", propriedade: "codigo" },
        { titulo: "Descrição", propriedade: "descricao" }
      ];

    //Se passar alguma coluna com a propriedade visivel "false" será retirado da exibicao
    this.colunas.forEach((item) => {
      if (item.visivel != false) this.colunasVisiveis.push(item);
    });

    this.colunas = this.colunasVisiveis;

    if (this.usaSelecao) this.tituloColunas.push(this.colunaSelect);
    this.colunas.forEach(coluna => this.tituloColunas.push(coluna.propriedade));
    if (this.headers) this.headers.forEach(h => this.tituloHeaders.push(h.id));
    this.modeloSelecao = new SelectionModel<any>(true, [], true);
    this.ajustouColunasDaGrid = true;
  }

  todosItensEstaoSelecionados() {
    const numSelected = this.modeloSelecao.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  alternarSelecaoItem(row: any) {
    this.modeloSelecao.toggle(row);
    row[this.colunaSelect] = this.modeloSelecao.isSelected(row);
    this.eventoAoAlterarSelecao();
    if (!this.modeloSelecao.isSelected(row)) {
      this.eventoAoRemoverSelecaoDeItem.emit(row);
    }
  }

  eventoDblClick(row: any) {
    if (this.metodoClick) this.metodoClick(row);
  }

  eventoClickColuna(acao: any, row: any, visao: any) {
    if (acao) acao(row, visao);
  }

  alternarSelecaoGeral() {
    if (this.todosItensEstaoSelecionados()) {
      this.dataSource.data.forEach(row => {
        this.modeloSelecao.deselect(row);
        row[this.colunaSelect] = false;
        this.eventoAoRemoverSelecaoDeItem.emit(row);
      });
    }
    else {
      this.dataSource.data.forEach(row => {
        this.modeloSelecao.select(row);
        row[this.colunaSelect] = true;
      });
    }
    this.eventoAoAlterarSelecao();
  }

  obterItensSelecionados() {
    return this.modeloSelecao.selected;
  }

  obterTodosOsItens() {
    return [].concat(this.dataSource.data)
  }

  eventoAoAlterarSelecao() {
    let itensSelecionados = [].concat(this.modeloSelecao.selected);
    this.eventoSelecao.emit(itensSelecionados);
  }

  getTotal(coluna: string, especifico: string, type: string) {   
    let total = 0;
 
    if (especifico) {
      return this.dataSource.data.map(t => t[especifico])[0];
    }
    else {  
      total = this.roundTo(this.dataSource.data.map(t => t[coluna]).reduce((soma, valor) => soma + valor, 0), 2);

      if(type ==='P'){
        this.totalPrevisto = total;
      }
      else if(type ==='R'){
        this.totalRealizado = total;
      }
      
      return total;
    }
  }

  roundTo(n, digits) {
    if (digits === undefined) {
      digits = 0;
    }

    let multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
  }

  formatarNumero(valor, simbolo = '') {
    if (isNaN(valor) || valor == '')
      return valor;
    else {
      let val = null;
      if (parseFloat(valor) == parseInt(valor))
        val = this.roundTo(valor, 2).toLocaleString('pt-BR');
      else
        val = this.roundTo(valor, 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

      return `${val} ${simbolo}`;
    }

  }

  formatarMonetario(valor: string): string {
    if(!isNumber(valor))
      return valor;
      
    return 'R$ ' + this.roundTo(parseFloat(valor), 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  verificarTipoArray(obj: any) {
    if (obj instanceof Array)
      return true;
    else
      return false;
  }

  obterCorDaLinha(row: any, coluna: any) {
    let cor: string;
    this.cores.forEach(item => {
      if (coluna.propriedade === item.propCampoAColorir) {
        cor = row[item.propDeCor];
        return;
      }
    }
    );

    return cor;
  }

  ajusteItensSelecionados(itens: any) {
    this.modelo = itens;
    this.marqueItensSelecionados();
  }

  eventoClickPersonalizado(item :any, coluna:any){
    if(coluna.evento)   coluna.evento(item);
  }

  marqueTodosOsItens() {
    this.dataSource.data.forEach(row => {
      this.modeloSelecao.select(row);
      row[this.colunaSelect] = true;
    });
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  getPorcentTotal() {
    let totalPercent = 0;
    
    if (this.totalPrevisto !== 0 && this.totalRealizado !== 0){      
      totalPercent = ((this.totalRealizado / this.totalPrevisto) * 100)
      
      this.totalPrevisto = 0;
      this.totalRealizado = 0;

      totalPercent = this.roundTo(totalPercent, 2);
    }

    return totalPercent;
  }
}
