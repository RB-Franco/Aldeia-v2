import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  router: Router;
  empresa: any = 1;
  rotaAtual: string = '/pages/cadastros/empresa';

  constructor(public rotas: Router) 
    {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.router = rotas;
    }

  ngOnInit() {
  }

  detalheEmpresa(id: number) {
    this.router.navigate(['/pages/cadastros/empresa/empresa-detalhe', id], {queryParams: {rotaAtual: this.rotaAtual}});
  }
  excluir(){
    
  }
}
