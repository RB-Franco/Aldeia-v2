import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { EmpresaDetalheComponent } from './empresa-detalhe/empresa-detalhe.component';

@Component({
  selector: 'app-Empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, {static: true}) formulario: FormularioAterrissagemComponent;
  
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;

  filtros = { descricao: '', cnpj: '' };

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10 },
    { titulo: 'Descrição', propriedade: 'descricao', width: 150 },
    { titulo: 'CNPJ', propriedade: 'cnpj', width: 150 },
    { titulo: 'Telefone', propriedade: 'telefone', width: 150 },
    { titulo: 'CEP', propriedade: 'cep', width: 150 },
    { titulo: 'Estado', propriedade: 'estado', width: 150 },
    { titulo: 'Cidade', propriedade: 'cidade', width: 150 },
    { titulo: 'Logradouro', propriedade: 'logradouro', width: 150 },
    { titulo: 'Complemento', propriedade: 'complemento', width: 150 },
    { titulo: 'Email	', propriedade: 'email', width: 150 },
    { titulo: 'Usr. cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Data cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acao', width: 150 }
  ];

  acoes = [
    {icone: 'feather icon-edit', evento: this.detalheEmpresa.bind(this)},
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

      this.router = rotas;
    }

  ngOnInit() {
  }

  pesquisar(){
    this.formulario.pesquisar();
  }

  detalheEmpresa(row: any) {
    const detRef = this.configDialog.open(EmpresaDetalheComponent, { width: '1000px', height:'600px',panelClass: 'cdk-overlay-container' ,  disableClose:true, data: row}).addPanelClass('painel-class');
    detRef.afterClosed().subscribe(result => {
      if (result) {
        this.pesquisar();
      }
    });
  }
  
  excluir(row: any){
    this.comunicacao.delete('api/empresa/excluir-empresa', {dados: { id: row.id}}).then((result: any) => { 
      if(result.success){        
        this.pesquisar();
      }
    }); 
  }
}
