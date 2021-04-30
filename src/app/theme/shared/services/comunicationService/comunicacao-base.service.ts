import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoBaseService {

  constructor( public http: HttpClient, public dialogo: MensagensService) { }

  private _caminhoApi: string = "https://localhost:5001/";
  public set caminhoApi(value:string){
    this._caminhoApi = value;
  }
  public get caminhoApi() {
    return this._caminhoApi;
  }

  public post(servico: string, { dados = <any>(null), enviarComoQueryString = false, exibirLoading = true, retornaArquivo = false } = {}): Promise<any> {
    if (exibirLoading) this.dialogo.exibaLoading();

    const corpo = enviarComoQueryString ? {} : dados;
    const params = enviarComoQueryString ? dados : {};

    if(retornaArquivo){
      return this.http
      .post(`${this.caminhoApi}${servico}`, corpo, { params: params, responseType: "blob"})
      .catch(this.tratarErro.bind(this))
      .finally(this.removerLoading.bind(this, exibirLoading))
      .toPromise()
      .then(this.tratarInconsistencias.bind(this));  
    }
    else
      return this.http
        .post(`${this.caminhoApi}${servico}`, corpo, { params: params })
        .catch(this.tratarErro.bind(this))
        .finally(this.removerLoading.bind(this, exibirLoading))
        .toPromise()
        .then(this.tratarInconsistencias.bind(this));
  }

  public put(servico: string, { dados = <any>(null), exibirLoading = true } = {}) {

    if (exibirLoading) this.dialogo.exibaLoading();

    return this.http
      .put(`${this.caminhoApi}${servico}`, dados || {})
      .catch(this.tratarErro.bind(this))
      .finally(this.removerLoading.bind(this, exibirLoading))
      .toPromise()
      .then(this.tratarInconsistencias.bind(this));
  }

  public delete(servico: string, { dados = <any>(null), exibirLoading = true } = {}) {

    if (exibirLoading) this.dialogo.exibaLoading();

    return this.http
      .delete(`${this.caminhoApi}${servico}`, { params: dados })
      .catch(this.tratarErro.bind(this))
      .finally(this.removerLoading.bind(this, exibirLoading))
      .toPromise()
      .then(this.tratarInconsistencias.bind(this));
  }

  public get(servico: string, { dados = <any>(null), exibirLoading = true } = {}, retornarStatusResposta: boolean = false) {

    if (exibirLoading) this.dialogo.exibaLoading();

    return this.http
      .get(`${this.caminhoApi}${servico}`, { params: dados })
      .catch(e => this.tratarErro(e, retornarStatusResposta))
      .finally(this.removerLoading.bind(this, exibirLoading))
      .toPromise()
      .then(this.tratarInconsistencias.bind(this));
  }

  public uploadImagem(formData: any, servico: string = 'arquivos/uploadImage') {

    const uploadRequest = new HttpRequest('POST', `${this.caminhoApi}${servico}`, formData,
      {
        reportProgress: true,
      });

    return this.http.request(uploadRequest);
  }

  private removerLoading(exibirLoading: boolean = true) {
    if (exibirLoading) this.dialogo.removerLoading();
  }

  private tratarErro(resposta: Response | any, retornarStatusResposta: boolean = false) {

    if (resposta.status == 500) {

      this.tratarInconsistencias(resposta);

    } else if (resposta.status == 401) {

      this.dialogo.exibaToastAlerta('Login incorreto!');

    } else if (resposta.status == 403) { //não autorizado

      this.dialogo.exibaToastAlerta('Ação não permitida, solicite permissão para realizar essa operação ao seu supervisor!');
    } else {

      let mensagemDeErro: string;

      if ((resposta.status < 400 || resposta.status > 499) && resposta instanceof Response) {

        const body: any = resposta.body || '';

        if (body.target instanceof XMLHttpRequest) {

          return Observable.throw('desconectado');

        } else {

          const err = body.error || JSON.stringify(body);

          mensagemDeErro = `${resposta.status} - ${resposta.statusText || ''} ${err}`;
        }
      } else {

        mensagemDeErro = resposta.message ? resposta.message : resposta.toString();
      }

      // this.dialogo.exibaAlertaDeErro(mensagemDeErro);
    }

    if (retornarStatusResposta){
      return _throw(resposta.status.toString());
    }

    return _throw('erro');
  }

  private tratarInconsistencias(resposta: any) {

    if (resposta && resposta.valido != undefined && !resposta.valido) {
      this.dialogo.exibaToastAlerta(resposta.mensagem);
      return Promise.reject(resposta);
    }

    return resposta;
  }

  public convertBase64ToBlobData(base64Data: string, contentType: string = 'image/jpeg', sliceSize = 512) {
    const byteCharacters = atob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
