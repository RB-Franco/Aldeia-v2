
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { MensagensService } from './mensagens.service';
import { ResponseError } from '../interfaces/response-error';
/**
 * Criar uma classe generica do tipo abstract para o projeto estendendo essa para e configurar
 *
 * @abstract this.getURL() retornando o valor de environment com o valor da url padrao
 * Caso necessario em algum outro service do projeto sobrescreva o metodo e passe o valor desejado.
 */
export abstract class GenericServices {

  private static totalLoading = 0;

  abstract getMensagensService(): MensagensService;
  abstract getHttpClient(): HttpClient;
  abstract getUrlRecurso(): string;
  abstract getBaseURL(): string;

  protected getURL(servico) {
    return `${this.getBaseURL()}${this.getUrlRecurso()}${servico}`;
  }

  post<T>(servico: string, { dados = <any>(null), enviarComoQueryString = false, exibirLoading = true, dispararMensagemError = true, tituloMensagemError = '' } = {}): Observable<T> {
    this.disparaLoading(exibirLoading);

    const corpo = enviarComoQueryString ? {} : dados;
    const params = enviarComoQueryString ? dados : {};

    return this.getHttpClient()
      .post<T>(this.getURL(servico), corpo, { params: params })
      .pipe(
        take(1),
        finalize(this.removerLoading.bind(this, exibirLoading)),
        catchError(error => this.tratarErro(error, dispararMensagemError, tituloMensagemError))
      );
  }

  put<T>(servico: string, { dados = <any>(null), enviarComoQueryString = false, exibirLoading = true, dispararMensagemError = true, tituloMensagemError = '' } = {}): Observable<T> {
    this.disparaLoading(exibirLoading);

    const corpo = enviarComoQueryString ? {} : dados;
    const params = enviarComoQueryString ? dados : {};

    return this.getHttpClient()
      .put<T>(this.getURL(servico), corpo, { params: params })
      .pipe(
        take(1),
        finalize(this.removerLoading.bind(this, exibirLoading)),
        catchError(error => this.tratarErro(error, dispararMensagemError, tituloMensagemError))
      );
  }

  get<T>(servico: string, { dados = null, exibirLoading = true, dispararMensagemError = true, tituloMensagemError = '' } = {}): Observable<T> {
    this.disparaLoading(exibirLoading);
    return this.getHttpClient()
      .get<T>(this.getURL(servico), { params: dados })
      .pipe(
        take(1),
        finalize(this.removerLoading.bind(this, exibirLoading)),
        catchError(error => this.tratarErro(error, dispararMensagemError, tituloMensagemError))
      );
  }

  delete(servico: string, { dados = <any>(null), enviarComoQueryString = false, exibirLoading = true, dispararMensagemError = true, tituloMensagemError = '' } = {}): Observable<Object> {
    this.disparaLoading(exibirLoading);

    const params = enviarComoQueryString ? dados : {};

    return this.getHttpClient()
      .delete(this.getURL(servico), { params: params })
      .pipe(
        take(1),
        finalize(this.removerLoading.bind(this, exibirLoading)),
        catchError(error => this.tratarErro(error, dispararMensagemError, tituloMensagemError))
      );
  }

  public uploadImagem(formData: any, servico: string = 'arquivos/uploadImage') {

    const uploadRequest = new HttpRequest('POST', `${this.getURL(servico)}`, formData,
      {
        reportProgress: true,
      });

    return this.getHttpClient().request(uploadRequest);
  }

  protected disparaLoading(exibirLoading) {
    if (exibirLoading) {
      GenericServices.totalLoading++;
      this.getMensagensService().exibaLoading();
    }
  }

  protected removerLoading(exibirLoading: boolean = true) {
    if (exibirLoading) {
      GenericServices.totalLoading--;
      if (GenericServices.totalLoading <= 0) {
        this.getMensagensService().removerLoading();
      }
    }
  }


  protected tratarErro(resposta: Response | any, dispararMensagemError: boolean, tituloMensagemError = '') {
    if (dispararMensagemError) {
      const bodyError = resposta ? resposta.error : null;

      if (bodyError && bodyError.hasOwnProperty('statusCode')) {
        const responseError: ResponseError = bodyError;
        if (responseError.erros) {
          if (responseError.erros.length === 1) {
            const error = responseError.erros[0];
            this.getMensagensService().exibaToastAlerta(error.message);
            console.log(`message ${error.message} develop ${error.developerMessage} error ${error.error}`);
          } else {
            const listaErrors: string[] = [];
            responseError.erros.forEach(error => {
              console.log(`message ${error.message} develop ${error.developerMessage} error ${error.error}`);
              listaErrors.push(error.message);
            });

            this.getMensagensService().exibaAlertaDeErros(listaErrors, tituloMensagemError);
          }
        }
      } else {

        let mensagemDeErro: string;

        if (resposta.status == 401 && this.redirectUnauthorized()) {
          return;
        }

        if ((resposta.status < 400 || (resposta.status > 499 && resposta.status != 501))
          && resposta instanceof HttpErrorResponse) {

          const body: any = resposta.error || '';

          if (body.target instanceof XMLHttpRequest) {

            // mensagemDeErro = 'Servidor desconectado.';

            mensagemDeErro = `${resposta.status} - ${resposta.statusText || ''} ${body}`;

          } else {

            const err = body.error || JSON.stringify(body);

            mensagemDeErro = `${resposta.status} - ${resposta.statusText || ''} ${err}`;
          }
        } else {

          mensagemDeErro = resposta.message ? resposta.message : resposta.toString();
        }

        this.getMensagensService().exibaToastAlerta(mensagemDeErro);
      }
    }

    return throwError(resposta);
  }

  redirectUnauthorized(): boolean {
    return false;
  }
}
