import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CatalogoDetalheComponent } from './catalogo-detalhe/catalogo-detalhe.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;


  constructor( 
    public configDialog: MatDialog,
    ) {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  ngOnInit() {
  }

  async detalheCatalogo(){
    
    this.configDialog.open(CatalogoDetalheComponent, 
                                              {data: 'testejjsvjsdjvkskbshvbkhfbkdfjhsdklfdifhsdlfksl' });


  }
}
