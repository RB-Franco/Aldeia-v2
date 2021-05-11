import { Component, OnInit, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogOptions } from './confirm-dialog-options';

@Component({
  selector: 'mx-dialogo-mensagem-confirm',
  templateUrl: './dialogo-mensagem-confirm.component.html',
  styleUrls: ['./dialogo-mensagem-confirm.component.scss']
})
export class DialogoMensagemConfirmComponent implements OnInit, OnDestroy {

  SIM = ConfirmDialogOptions.SIM;
  NAO = ConfirmDialogOptions.NAO;

  confirmEventEmitter = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.confirmEventEmitter.unsubscribe();
  }

  confirm(value) {
    this.confirmEventEmitter.emit(value);
  }
}
