import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formulario: FormularioAterrissagemComponent;

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/produto';

  constructor(
    public comunicacao: ComunicacaoBaseService,
    public rotas: Router,
    public configDialog: MatDialog,
    detDialog: MatDialog) {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
  }

  filtros = { descricao: '' };

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10 },
    { titulo: 'Descrição', propriedade: 'descricao', width: 350 },
    { titulo: 'Und. medida', propriedade: 'unidadeMedida', width: 150 },
    { titulo: 'Usr. cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Data cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acoes', width: 150 }
  ];

  acoes = [
    { icone: 'feather icon-edit', evento: this.detalheProduto.bind(this) },
    { icone: 'feather icon-trash-2', evento: this.excluir.bind(this) },
  ];

  ngOnInit() {
  }

  pesquisar(filtros: any) {
    this.formulario.pesquisar();
  }

  detalheProduto(row: any) {
    const detRef = this.configDialog.open(ProdutoDetalheComponent, { width: '1000px', height: '400px', panelClass: 'cdk-overlay-container', disableClose: true, data: row }).addPanelClass('painel-class');
    detRef.afterClosed().subscribe(result => {
      if (result) {
        this.pesquisar(this.filtros);
      }
    });
  }

  excluir(row: any) {
    this.comunicacao.delete('api/produto/excluir-produto', { dados: { id: row.id } }).then((result: any) => {
      if (result.success) {
        this.pesquisar(this.filtros);
      }
    });
  }
}
