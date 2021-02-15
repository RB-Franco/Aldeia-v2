import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/cliente';


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

  detalheCliente(id: number) {
    this.router.navigate(['/pages/cadastros/cliente/cliente-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
