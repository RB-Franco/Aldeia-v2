import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo-detalhe',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrls: ['./catalogo-detalhe.component.scss']
})
export class CatalogoDetalheComponent implements OnInit {
  texto: string = '';

  constructor(
    private fb : FormBuilder,
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
