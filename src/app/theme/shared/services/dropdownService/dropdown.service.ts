import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadoBr() {
    return this.http.get('assets/dadosEstados/estadosbr.json');
  }
  gettipoUsuarios() {
    return this.http.get('assets/dadosEstados/tipoUsuarios.json');
  }
}
