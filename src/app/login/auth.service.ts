import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome ==='123' && usuario.senha==='123'){
      this.usuarioAutenticado = true;
      this.router.navigate(['//inicio'])
      this.mostrarMenuEmitter.emit(true);
    }
    else{
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

  }
}
