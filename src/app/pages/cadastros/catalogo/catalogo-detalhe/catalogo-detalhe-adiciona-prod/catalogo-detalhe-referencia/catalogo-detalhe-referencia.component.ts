import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { NextConfig } from 'src/app/app-config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo-detalhe-referencia',
  templateUrl: './catalogo-detalhe-referencia.component.html',
  styleUrls: ['./catalogo-detalhe-referencia.component.scss']
})

export class CatalogoDetalheReferenciaComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formulario: FormularioAterrissagemComponent;
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  idRef: any;
  codReferencia: any;
  descReferencia: any;
  tamanhoReferencia: any;
  usrCadastroRef: any;

  listReferencias = [];

  constructor( ) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
  }

  colunasReferencias = [
    { titulo: 'Código', propriedade: 'codReferencia', width: 80 },
    { titulo: 'Descrição', propriedade: 'descricao', width: 150 },
    { titulo: 'Tamanho', propriedade: 'tamanho', width: 150 },
    { titulo: 'Ações', width: 10 }
  ];
  acoesReferencias = [{ titulo: 'Ação', icone: 'feather icon-trash-2', evento: this.excluir.bind(0, this) }];

  ngOnInit() {
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  excluir() {
  }
  adicionar() {
    if(!this.codReferencia || !this.descReferencia || !this.tamanhoReferencia ){
      swal('Atenção', 'Informe os dados para adicionar uma referência.', 'error');
      return;
    }

    this.listReferencias.push({
      codReferencia: this.codReferencia,
      produtoId: undefined,
      catalogoId: undefined,
      descricao: this.descReferencia,
      tamanho: this.tamanhoReferencia,
      usrCadastro: 'Supervisor'
    });
    this.formulario.pesquisar();
    
    this.codReferencia = undefined;
    this.descReferencia = undefined;
    this.tamanhoReferencia = undefined;
  }

  retornarLista() {
    return this.listReferencias;
  }
}
