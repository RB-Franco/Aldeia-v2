import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/fornecedor';

  constructor(public rotas: Router) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
    }

  ngOnInit() {
  }

  detalheFornecedor(id: number) {
    this.router.navigate(['/pages/cadastros/fornecedor/fornecedor-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }

}
