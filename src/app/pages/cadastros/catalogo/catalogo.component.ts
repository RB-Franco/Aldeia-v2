import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material';
import { CatalogoDetalheComponent } from './catalogo-detalhe/catalogo-detalhe.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  @ViewChild(CatalogoDetalheComponent, { static: true }) child: CatalogoDetalheComponent;

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  constructor(
    public configDialog: MatDialog,
    public detDialog: MatDialog,
    public relatorioDialogo: MatDialog
  ) {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  ngOnInit() {
  }

  detalheCatalogo() {

    this.configDialog.open(CatalogoDetalheComponent,
      {
        width: '95%', height: '95%', disableClose: true,
        panelClass: '',
        data: 'testejjsvjsdjvkskbshvbkhfbkdfjhsdklfdifhsdlfksl'
      });


  }
}
