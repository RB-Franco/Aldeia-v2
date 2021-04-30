import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, {static: true}) formulario: FormularioAterrissagemComponent;
  
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;

  filtros = { nome: '', tipoUsuario: '',  loginUsuario: '' };

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10 },
    { titulo: 'Nome', propriedade: 'nome', width: 150 },
    { titulo: 'Usuário', propriedade: 'nomeUsuario', width: 150 },
    { titulo: 'Tipo', propriedade: 'tipoUsuario', width: 150 },
    { titulo: 'Estado de atuação', propriedade: 'estadoAtuacao', width: 150 },
    { titulo: 'Telefone', propriedade: 'telefone', width: 150 },
    { titulo: 'Status', propriedade: 'status', width: 150 },
    { titulo: 'Usr. cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Data cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acoes', width: 150 }
  ];
  
  acoes = [
    {icone: 'feather icon-edit', evento: this.detalheUsuario.bind(this)},
    {icone: 'feather icon-trash-2', evento: this.excluir.bind(this)},
  ];
  
  constructor(private comunicacao: ComunicacaoBaseService,
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
  
  detalheUsuario(row: any) {
    const detRef = this.configDialog.open(UsuarioDetalheComponent, { width: '1000px', height:'490px',panelClass: 'cdk-overlay-container' ,  disableClose:true, data: row}).addPanelClass('painel-class');    
  }

  excluir(row: any){
    this.comunicacao.delete('api/usuarios/excluir-usuario', {dados: { id: row.id}}).then((result: any) => { 
      if(result.success){
        alert(result.data)
        this.pesquisar();
      }
    }); 
  }
}
