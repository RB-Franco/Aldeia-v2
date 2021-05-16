import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NextConfig } from '../../../../../../app-config';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { CatalogoComponent } from '../../../catalogo.component';
import swal from 'sweetalert2';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { CatalogoDetalheReferenciaComponent } from '../catalogo-detalhe-referencia/catalogo-detalhe-referencia.component';
import { MensagensService } from 'src/app/theme/shared/services/comunicationService/mensagens.service';
import { CatalogoDetalheAdicionaProdComponent } from '../catalogo-detalhe-adiciona-prod.component';

@Component({
  selector: 'app-catalogo-detalhe-linha',
  templateUrl: './catalogo-detalhe-linha.component.html',
  styleUrls: ['./catalogo-detalhe-linha.component.scss']
})

export class CatalogoDetalheLinhaComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formulario: FormularioAterrissagemComponent;
  @ViewChild(CatalogoDetalheReferenciaComponent, { static: true }) formularioReferencia: CatalogoDetalheReferenciaComponent;
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();
  //linha
  idLinha: any;
  codRefLinha: any;
  linha: any;
  valor: any;
  usrCadastroLinha: any;
  listLinhas = [];
  listReferencias = [];

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private menssagem: MensagensService,
  ) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;

  }

  colunasLinhas = [
    { titulo: 'Código referencia', propriedade: 'codigoReferencia', width: 80 },
    { titulo: 'Linha', propriedade: 'linha', width: 150 },
    { titulo: 'Valor', propriedade: 'valor', width: 150 },
    { titulo: 'Ações', width: 10 }
  ];
  acoesLinhas = [{ titulo: 'Ação', icone: 'feather icon-trash-2', evento: this.excluirLinha.bind(1, this) }];

  ngOnInit() {
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  excluirLinha() {
    
  }
  adicionarLinha() {
    if(!this.codRefLinha || !this.linha || !this.valor ){
      swal('Atenção', 'Informe os dados para adicionar uma linha.', 'error');
      return;
    }
    this.listLinhas.push({ 
      codProduto: undefined,
      codigoReferencia: this.codRefLinha,
      linha: this.linha,
      valor: this.valor });
    this.formulario.pesquisar();
    
    this.linha = undefined;
    this.valor = undefined;
  }

  retornarListaLinha() {
    return this.listLinhas;
  }
  
  retornarListaReferencia() {
    return this.formularioReferencia.retornarLista();
  }
}
