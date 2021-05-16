import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { CatalogoDetalheComponent } from './catalogo-detalhe/catalogo-detalhe.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, {static: true}) formulario: FormularioAterrissagemComponent;
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;
 
  filtros = { catalogo: '', fornecedor: ''};

  colunas = [
    { titulo: '#', propriedade: 'id', width: 5},
    { titulo: 'Descrição', propriedade: 'descricao', width: 350 },    
    { titulo: 'Fornecedor', propriedade: 'fornecedor', width: 220 },
    { titulo: 'Usr. Cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Dt. Cadasto', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', centralizarHeader: true, width: 10}
  ];

  acoes = [
    {icone: 'feather icon-edit',  evento: this.detalheCatalogo.bind(this)},
    {icone: 'feather icon-trash-2', evento: this.excluir.bind(this)},
  ];

  constructor(
    private comunicacao: ComunicacaoBaseService,
    public rotas: Router, 
    public configDialog: MatDialog, 
    detDialog: MatDialog) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    }

  ngOnInit() {
  }

  pesquisar(){
    this.formulario.pesquisar();
  }

  detalheCatalogo(row: any) {
    const detRef = this.configDialog.open(CatalogoDetalheComponent, { width: '75%', height:'85%',panelClass: 'cdk-overlay-container' ,  disableClose:true, data: row}).addPanelClass('painel-class');
    detRef.afterClosed().subscribe(result => {
      if (result) {
        this.pesquisar();
      }
    });
    //this.router.navigate(['/pages/cadastros/fornecedor/fornecedor-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(row: any){
    this.comunicacao.delete('api/catalogo/excluir-catalogo', {dados: { id: row.id}}).then((result: any) => { 
      if(result.success){
        alert(result.data)
        this.pesquisar();
      }
    });
  }
}
