import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-catalogo-detalhe',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrls: ['./catalogo-detalhe.component.scss']
})
export class CatalogoDetalheComponent implements OnInit {
  texto: string = '';

  constructor(
    private dialogref: MatDialogRef<CatalogoDetalheComponent>,
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
