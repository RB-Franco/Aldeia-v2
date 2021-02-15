import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/catalogo';

  constructor(
    public rotas: Router
    ) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
    }

  ngOnInit() {
  }

  detalheCatalogo(id: number) {
    this.router.navigate(['/pages/cadastros/catalogo/catalogo-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
