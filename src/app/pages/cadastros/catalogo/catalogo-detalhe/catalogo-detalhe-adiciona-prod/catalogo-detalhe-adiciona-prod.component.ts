import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NextConfig } from '../../../../../app-config';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { CatalogoDetalheLinhaComponent } from './catalogo-detalhe-linha/catalogo-detalhe-linha.component';
import { CatalogoDetalheComponent } from '../catalogo-detalhe.component';
import { CatalogoDetalheReferenciaComponent } from './catalogo-detalhe-referencia/catalogo-detalhe-referencia.component';
import swal from 'sweetalert2';

@Component({
  selector: 'catalogo-detalhe-adiciona-prod',
  templateUrl: './catalogo-detalhe-adiciona-prod.component.html',
  styleUrls: ['./catalogo-detalhe-adiciona-prod.component.scss']
})

export class CatalogoDetalheAdicionaProdComponent implements OnInit {
  @ViewChild(CatalogoDetalheLinhaComponent, { static: true }) formularioLinha: CatalogoDetalheLinhaComponent;

  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();
  
  fornecedores: any;
  produtos: any;

  //referencia
  idRef: any;
  codReferencia: any;
  descReferencia: any;
  tamanhoReferencia: any;
  usrCadastroRef: any;
  
  codProduto: any;

  listReferencias = [];
  listProdutos = [];

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private titleService: Title,
    public dialogRef: MatDialogRef<CatalogoDetalheComponent>,
    public configDialog: MatDialog
  ) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
  }

  colunasReferencias = [
    { titulo: 'Código', propriedade: 'codigo', width: 80 },
    { titulo: 'Descrição', propriedade: 'descricao', width: 150 },
    { titulo: 'Tamanho', propriedade: 'tamanho', width: 150 }
  ];
  acoesReferencias = [{ titulo: 'Ação', icone: 'feather icon-trash-2', evento: this.excluir.bind(0, this) }];

  ngOnInit() {    
    this.comunicacao.get('api/produto/obter-produtos/pesquisar').then((result: any) => {
      this.produtos = result.data;
    });
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  excluir() {
  }

  adicionarProduto(){
    
    if(this.codProduto === undefined){
      swal('Atenção', 'Informe um produto', 'error');
      return;
    }

    let listaReferencia = this.formularioLinha.retornarListaReferencia();
    let listaLinha = this.formularioLinha.retornarListaLinha();
    
    if(listaReferencia.length === 0 || listaLinha.length === 0){
      swal('Atenção', 'Informe ao menos uma referência e uma linha para o produto', 'error');
      return;
    }

    listaReferencia.forEach(row => row.codProduto = this.codProduto);
    listaLinha.forEach(row => row.codProduto = this.codProduto);

    let data ={ 
      success: true,     
      listaReferencias: listaReferencia,
      listaLinhas: listaLinha
    }
    this.dialogRef.close(data)
  }

  cancelar(){
    let data ={ 
      success: false
    }
    this.dialogRef.close(data)
  }

}
