import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'mx-dialogo-mensagem-errors',
  templateUrl: './dialogo-mensagem-errors.component.html',
  styleUrls: ['./dialogo-mensagem-errors.component.scss']
})
export class DialogoMensagemErrorsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
