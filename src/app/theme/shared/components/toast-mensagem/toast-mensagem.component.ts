import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-toast-mensagem',
  templateUrl: './toast-mensagem.component.html',
  styleUrls: ['./toast-mensagem.component.scss']
})
export class ToastMensagemComponent {

  mensagens: string[];
  css: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.mensagens = data.mensagens;
    this.css = data.css;
  }

  fechar() {
    const elemento = document.querySelector<any>('.mat-snack-bar-container');
    if (elemento) elemento.remove();
  }
}
