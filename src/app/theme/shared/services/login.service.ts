import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Usuario } from '../model/usuario';
import { ComunicaoService } from '../_data-service/comunicacao-service';
import { ComunicacaoBaseService } from './comunicacao-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(
    private router: Router,
    public comunicacao: ComunicacaoBaseService,
    private comunicacaoService: ComunicaoService ) { }

  fazerLogin(usuario: Usuario){
    
    let login = {
      id: 0,
      usuario: usuario.nome,
      senha: usuario.senha
    }

    let retorno: any;

    // this.comunicacaoService.get().subscribe(data => {
    //   retorno = data;
    // }, error => {
    //   console.log(error);
    //   alert('Erro do sistema');
    // })


    this.comunicacao
      .post('api/login/login', {dados: login})
      .then((response: any ={}) => {
        debugger;
        if(response.success) {
          this.usuarioAutenticado = true;
          this.router.navigate(['//inicio']);  
        }else{
          this.usuarioAutenticado = false;
          alert('Usuario ou senha incorreto')
        }
    }).catch(console.log);

    // if(usuario.nome ==='123' && usuario.senha==='123'){
    //   this.usuarioAutenticado = true;

    //   this.router.navigate(['//inicio']);
    // }
    // else{
      
    // }
  }
  fazerLogout(){
    if(confirm('Fazer logof do sistema ?').valueOf()){
      this.router.navigate(['/']);
    }    
  }
}
