import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-pedido',
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.scss']
})
export class ConsultaPedidoComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/vendas/consultar-pedido';


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

  detalhePedido(id: number) {
    this.router.navigate(['/pages/vendas/detalhe-pedido', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
