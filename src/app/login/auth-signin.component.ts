import { Component, OnInit } from '@angular/core';
import { UsuarioComponent } from '../pages/cadastros/usuario/usuario.component';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  
  private usuario: Usuario = new Usuario();
  
  constructor(private authSevice: AuthService) { }

  ngOnInit() {
    
  }

  fazerLogin(){
    this.authSevice.fazerLogin(this.usuario);
  }
}
