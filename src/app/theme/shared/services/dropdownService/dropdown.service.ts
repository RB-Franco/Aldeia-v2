import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadoBr() {
    return this.http.get('assets/dadosEmJson/estadosbr.json');
  }
  getTipoUsuarios() {
    return this.http.get('assets/dadosEmJson/tipoUsuarios.json');
  }
  getListaStatus() {
    return this.http.get('assets/dadosEmJson/listaStatus.json');
  }
}
