import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, {static: true}) formulario: FormularioAterrissagemComponent;
  
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/produto';

  constructor(public rotas: Router) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
    }

    colunas = [
      { titulo: '#', propriedade: 'codigo', width: 10 },
      { titulo: 'Descrição', propriedade: 'descricao', width: 350 },
      { titulo: 'Und. medida', propriedade: 'embalagem', width: 150 },
      { titulo: 'Usr. cadastro', propriedade: 'usrCadastro', width: 150 },
      { titulo: 'Data cadastro', propriedade: 'dtCadastro', width: 150 },
      { titulo: 'Ações', propriedade: 'acoes', width: 150 }
    ];

    acoes = [
      {icone: 'feather icon-edit', evento: this.detalheProduto.bind(this)},
      {icone: 'feather icon-trash-2', evento: this.excluir.bind(this)},
    ];

  ngOnInit() {
  }
  pesquisar(filtros: any){
    //this.formulario.pesquisar(filtros);
  }

  detalheProduto(produto: any) {
    this.router.navigate(['/pages/cadastros/produto/produto-detalhe', produto.id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
