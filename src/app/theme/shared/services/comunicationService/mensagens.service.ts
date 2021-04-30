import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
//import { ToastMensagemComponent } from '../toast-mensagem/toast-mensagem.component';
//import { DialogoMensagemComponent } from '../dialogo-mensagem/dialogo-mensagem.component';
import { Observable, Subject } from 'rxjs';
//import { DialogoMensagemConfirmComponent } from '../dialogo-mensagem-confirm/dialogo-mensagem-confirm.component';
//import { ConfirmDialogOptions } from '../dialogo-mensagem-confirm/confirm-dialog-options';
//import { DialogoMensagemErrorsComponent } from '../dialogo-mensagem-errors/dialogo-mensagem-errors.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private zone: NgZone) { }

  exibaAlertaConfirmacao(mensagem: string, acao: string = 'excluir', html?: string, emitirReject?: boolean) {
    return new Promise((resolve, reject) => {

      Swal({
        title: 'Atenção!',
        text: mensagem,
        html: html,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c1392b',
        // cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim, ' + acao
      }).then((result) => {

        if (result.value) resolve();
        else if (emitirReject) reject();
      });
    });
  }

  exibaAlertaDeSucesso(mensagem: string) {
    this.exibaAlerta(mensagem, "Sucesso!");
  }

  exibaToastSucesso(mensagem: string) {

    this.toast('sucesso', mensagem);
  }

  exibaToastAlerta(...mensagens: string[]) {

    this.toast('alerta', ...mensagens);
  }

  private toast(css: string, ...mensagens: string[]) {

    // this.zone.run(() => {
    //   this.snackBar.openFromComponent(ToastMensagemComponent, {
    //     duration: 5000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'bottom',
    //     data: {
    //       mensagens: mensagens,
    //       css: css
    //     },
    //     panelClass: 'container-mensagens-toast'
    //   });
    // })

  }

  private exibaAlerta(mensagem: string, titulo: string, buttons: Array<any> = []) {

    // this.zone.run(() => {
    //   const modal = this.dialogo.open(DialogoMensagemComponent, {
    //     data: {
    //       mensagem: mensagem,
    //       titulo: titulo,
    //       buttons: buttons
    //     }
    //   });

    //   if (buttons.length == 0) {
    //     buttons.push({
    //       text: 'Ok',
    //       handler: () => modal.close(),
    //       cssClass: 'btn-ok'
    //     });
    //   }
    // })
  }

  exibaConfirmDialog(mensagem: string, titulo: string): Observable<{ confirmDialogSelect: any }> {
    const confirmDialog$ = new Subject<{ confirmDialogSelect: any }>();


    // this.zone.run(() => {
    //   const modal = this.dialogo.open(DialogoMensagemConfirmComponent, {
    //     disableClose: true,
    //     data: {
    //       mensagem: mensagem,
    //       titulo: titulo
    //     }
    //   });
  
    //   const fecharDialog = (value: ConfirmDialogOptions) => {
    //     confirmDialog$.next({
    //       confirmDialogSelect: value
    //     });
    //     modal.close();
    //   };
  
    //   const dialogoMensagemConfirmComponent: DialogoMensagemConfirmComponent = modal.componentInstance;
  
    //   dialogoMensagemConfirmComponent
    //     .confirmEventEmitter
    //     .subscribe((value: ConfirmDialogOptions) => {
    //       fecharDialog(value);
    //     });
    // })
    

    return confirmDialog$;
  }

  exibaAlertaDeErros(errors: string[], titulo: string) {

    const errorDialogo$ = new Subject<any>();

    // this.zone.run(() => {
    //   const modal = this.dialogo.open(DialogoMensagemErrorsComponent, {
    //     data: {
    //       errors: errors,
    //       titulo: titulo
    //     }
    //   });
  
    //   // const fecharDialog = (value: ConfirmDialogOptions) => {
    //   //   confirmDialog$.next({
    //   //     confirmDialogSelect: value
    //   //   });
    //   //   modal.close();
    //   // };
  
    //   const dialogoMensagemErrorsComponent: DialogoMensagemErrorsComponent = modal.componentInstance;
    // })


    // dialogoMensagemConfirmComponent
    //   .confirmEventEmitter
    //   .subscribe((value: ConfirmDialogOptions) => {
    //     fecharDialog(value);
    //   });

    return errorDialogo$;
  }

  exibaLoading() {
    this.alterarDisplayDoElemento(this.obtenhaLoadingElemento(), 'flex');
  }

  removerLoading() {
    this.alterarDisplayDoElemento(this.obtenhaLoadingElemento(), 'none');
  }

  private obtenhaLoadingElemento(): any {
    return document.querySelector('.loading-principal');
  }

  private alterarDisplayDoElemento(elemento: any, display: string) {
    if (elemento) {
      elemento.style.display = display;
    }
  }
}
