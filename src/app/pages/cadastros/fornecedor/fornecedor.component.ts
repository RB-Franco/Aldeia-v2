import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { FornecedorDetalheComponent } from './fornecedor-detalhe/fornecedor-detalhe.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, {static: true}) formulario: FormularioAterrissagemComponent;

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  filtros = { descricao: '', cnpj: '' , inscricaoEstadual: ''};

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10, centralizarHeader: true},
    { titulo: 'Descrição', propriedade: 'descricao', width: 150 },
    { titulo: 'CNPJ', propriedade: 'cnpj', width: 150 },
    { titulo: 'I.E', propriedade: 'ie', width: 150 },
    { titulo: 'Telefone', propriedade: 'telefone', width: 150 },
    { titulo: 'E-Mail', propriedade: 'email', width: 150 },
    { titulo: 'CEP', propriedade: 'cep', width: 150 },
    { titulo: 'Estado', propriedade: 'estado', width: 150 },
    { titulo: 'Cidade', propriedade: 'cidade', width: 150 },
    { titulo: 'Endereço principal', propriedade: 'logradouro', width: 150 },
    { titulo: 'Complemento', propriedade: 'complemento', width: 150 },    
    { titulo: 'CEP', propriedade: 'cepEntrega', width: 150 },
    { titulo: 'Estado', propriedade: 'estadoEntrega', width: 150 },
    { titulo: 'Cidade', propriedade: 'cidadeEntrega', width: 150 },
    { titulo: 'Endereço entrega', propriedade: 'logradouroEntrega', width: 150 },
    { titulo: 'Complemento', propriedade: 'complementoEntrega', width: 150 },
    { titulo: 'Estado de atuação', propriedade: 'estadoAtuacao', width: 150 },
    { titulo: 'Usr. cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Data cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acao', width: 150 }
  ];

  acoes = [
    {icone: 'feather icon-edit', centralizarHeader: true, centralizarValor: true, evento: this.detalheFornecedor.bind(this)},
    {icone: 'feather icon-trash-2', centralizarHeader: true, centralizarValor: true, evento: this.excluir.bind(this)},
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

  detalheFornecedor(row: any) {
    const detRef = this.configDialog.open(FornecedorDetalheComponent, { width: '95%', height:'95%',panelClass: 'cdk-overlay-container' ,  disableClose:true, data: row}).addPanelClass('painel-class');
    detRef.afterClosed().subscribe(result => {
      if (result) {
        this.pesquisar();
      }
    });
  }
  excluir(row: any){
    this.comunicacao.delete('api/fornecedor/excluir-fornecedor', {dados: { id: row.id}}).then((result: any) => { 
      if(result.success){
        this.pesquisar();
      }
    });
  }

}
