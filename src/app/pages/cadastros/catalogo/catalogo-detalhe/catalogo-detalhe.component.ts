import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CatalogoComponent } from '../catalogo.component';

@Component({
  selector: 'app-catalogo-detalhe',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrls: ['./catalogo-detalhe.component.scss']
})
export class CatalogoDetalheComponent implements OnInit {
  texto: string = '';

  constructor(
    private dialogref: MatDialogRef<CatalogoDetalheComponent>,    
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    ){
    this.texto = data;    
  }

  ngOnInit() {
  }
  
  onNoClick() {
    this.dialogref.close(false);
  }
}
