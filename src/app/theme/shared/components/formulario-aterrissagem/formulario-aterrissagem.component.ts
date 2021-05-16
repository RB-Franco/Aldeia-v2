import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GenericServices } from '../../services/comunicationService/generic-services';
import { ListaInfiniteScrollAcoesHelper } from '../lista-infinite-scroll/lista-infinite-scroll-acoes-helper';
import { ListaInfiniteScrollColunasHelper } from '../lista-infinite-scroll/lista-infinite-scroll-colunas-helper';
import { ListaInfiniteScrollComponent } from '../lista-infinite-scroll/lista-infinite-scroll.component';


@Component({
  selector: 'mx-formulario-aterrissagem',
  templateUrl: './formulario-aterrissagem.component.html',
  styleUrls: ['./formulario-aterrissagem.component.scss']
})
export class FormularioAterrissagemComponent implements OnInit {
  @ViewChild(ListaInfiniteScrollComponent, { static: true}) listagem: ListaInfiniteScrollComponent;

  @Input() titulo: string;
  @Input() icone: string;
  @Input() colunas: ListaInfiniteScrollColunasHelper[] = [];
  @Input() acoes: ListaInfiniteScrollAcoesHelper[] = [];
  @Input() servico: string = '';
  @Input() filtros: any = {};
  @Input() semPaginacao: boolean = false;
  @Input() funcaoAjusteDeParametros: any;
  @Input() colunaOrdenacao: string;
  @Input() genericServices: GenericServices;
  @Input() exibirLoading:boolean = false;
  @Input() servicoSalvarGrid: string = '';
  @Input() nomeGrid: string = '';
  @Input() dataSource: any = [];
  @Input() showHeader: boolean = true;
  @Output() aoCarregarDados = new EventEmitter();
  @Output() onChangeColunaEditavel = new EventEmitter();
  @Input() tamanho ='';


  constructor() {
   }

  ngOnInit() { }

  pesquisar() {

    this.listagem.pesquisar();
  }
  limparDataSource() {
    this.listagem.limparDataSource();
  }
  removerItem(item) {

    this.listagem.removerItem(item);
  }

  retornaDados() {
    return this.listagem.retornaDados();
  }
}
