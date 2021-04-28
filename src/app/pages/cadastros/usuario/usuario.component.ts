import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/usuario';

  colunas = [
    { titulo: '#', propriedade: 'codigo', width: 10 },
    { titulo: 'Nome', propriedade: 'descricao', width: 350 },
    { titulo: 'Usuário', propriedade: 'embalagem', width: 150 },
    { titulo: 'Tipo', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Estado de atuação', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Telefone', propriedade: 'acoes', width: 150 },
    { titulo: 'Status', propriedade: 'acoes', width: 150 },
    { titulo: 'Usr. cadastro', propriedade: 'acoes', width: 150 },
    { titulo: 'Data cadastro', propriedade: 'acoes', width: 150 },
    { titulo: 'Ações', propriedade: 'acoes', width: 150 }
  ];
  
  acoes = [
    {icone: 'feather icon-edit', evento: this.detalheUsuario.bind(this)},
    {icone: 'feather icon-trash-2', evento: this.excluir.bind(this)},
  ];
  
  constructor(public rotas: Router) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
    }

  ngOnInit() {
  }

  detalheUsuario(id: number) {
    this.router.navigate(['/pages/cadastros/usuario/usuario-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
