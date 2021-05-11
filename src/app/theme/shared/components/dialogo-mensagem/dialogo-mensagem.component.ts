import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'mx-dialogo-mensagem',
  templateUrl: './dialogo-mensagem.component.html',
  styleUrls: ['./dialogo-mensagem.component.scss']
})
export class DialogoMensagemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
