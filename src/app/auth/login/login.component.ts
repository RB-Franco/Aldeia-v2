import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../theme/shared/services/authService/auth.service';
import { Usuario } from '../../theme/shared/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
  
  public usuario: Usuario = new Usuario();
  
  constructor(private authSevice: AuthService) { }

  ngOnInit() {
    
  }

  fazerLogin(){
    this.authSevice.fazerLogin(this.usuario);
  }
}
