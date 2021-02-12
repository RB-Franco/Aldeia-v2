import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogContainer, MatDialogModule } from '@angular/material/dialog';
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
    const dialogConfig = new MatDialogConfig();


    dialogConfig.position = {
      top: '20%', right: '30%', left: '30%', bottom: '30%'};
      dialogConfig.width = '680px';
    this.configDialog.open(CatalogoDetalheComponent, dialogConfig);
  }
}
