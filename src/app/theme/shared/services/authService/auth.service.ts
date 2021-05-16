import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Usuario } from '../../model/usuario';
import { ComunicacaoBaseService } from '../comunicationService/comunicacao-base.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  token: string;
  constructor(
    private router: Router,
    public comunicacao: ComunicacaoBaseService ) { }

  fazerLogin(usuario: Usuario){
    
    let login = {
      nomeUsuario: usuario.nome,
      senha: usuario.senha
    }

    this.comunicacao
      .post('api/login/validar-usuario', {dados: login})
      .then((response: any ={}) => {
        if(response.success) {
          this.usuarioAutenticado = response.success;
          this.token = response.token.toString();
          this.router.navigate(['//inicio']);  
        }else{
          this.usuarioAutenticado = response.success;
          swal(
            'Erro',
            response.data,
            'error'
          );
          //alert(response.error.toString())
        }
    });
  }
  fazerLogout(){
    if(confirm('Fazer logof do sistema ?').valueOf()){
      this.usuarioAutenticado = false;
      this.router.navigate(['/']);
    }    
  }
  public returnToken(){
    return this.token;
  }
}
