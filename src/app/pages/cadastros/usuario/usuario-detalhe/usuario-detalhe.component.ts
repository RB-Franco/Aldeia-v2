import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import swal from 'sweetalert2';
import { NextConfig } from '../../../../app-config';
import { UsuarioComponent } from '../usuario.component';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss']
})
export class UsuarioDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  id: any;
  modelo: any;
  nome: any;
  nomeUsuario: any;
  senha: any;
  tipoUsuario: any;
  estadoAtuacao: any;
  status: any;
  telefone: any;
  usrCadastro: any;
  dtCadastro: any;

  estados: any;
  tipoUsuarios: any;
  ListaStatus: any;

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private titleService: Title,
    public dialogRef: MatDialogRef<UsuarioComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;

    if (data !== 0) {
      this.id = data.id,
      this.nome = data.nome,
      this.nomeUsuario = data.nomeUsuario.replace(),
      this.senha= data.senha,
      this.tipoUsuario = data.tipoUsuario.substring(0, 1),
      this.estadoAtuacao = data.estadoAtuacao,
      this.status = data.status.substring(0, 1),
      this.telefone = data.telefone,
      this.usrCadastro = data.usrCadastro,
      this.dtCadastro = data.dtCadastro
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro usuario');
    this.dropdowService.getEstadoBr().subscribe(dados => { this.estados = dados });
    this.dropdowService.getTipoUsuarios().subscribe(dados => { this.tipoUsuarios = dados });
    this.dropdowService.getListaStatus().subscribe(dados => { this.ListaStatus = dados });
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  salvar() {

    if(!this.validaCampos()){
      swal('Atenção', 'Informe todos os dados do usuario!', 'warning');
      return;
    }
    let usuario = {
      id: undefined,
      nome: this.nome,
      nomeUsuario: this.nomeUsuario,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario,
      estadoAtuacao: this.estadoAtuacao,
      status: this.status,
      telefone: this.telefone,
      usrCadastro: this.usrCadastro,
      dtCadastro: this.dtCadastro
    }

    if (this.id !== undefined) {
      usuario.id = this.id;
      this.comunicacao.put('api/usuarios/atualizar-usuario', { dados: usuario }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
        }
      });
    } else {
      usuario.usrCadastro = 'supervisor';
      this.comunicacao.post('api/usuarios/cadastrar-usuario', { dados: usuario }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
          usuario = result.data;
        }
      });
    }
  }  
  novo(){
    this.id = undefined; 			
    this.nome = undefined; 		
    this.nomeUsuario = undefined; 	
    this.senha= undefined; 		
    this.tipoUsuario = undefined; 	
    this.estadoAtuacao = undefined;
    this.status = undefined; 		
    this.telefone = undefined; 	
    this.usrCadastro = undefined; 	
    this.dtCadastro = undefined; 	
  }
  excluir(){
    if(!this.id){      
      return;
    }

    this.comunicacao.delete('api/usuarios/excluir-usuario', {dados: { id: this.id, nome: this.nome}}).then((result: any) => { 
      if(result.success){
        swal('Atenção', result.data, 'error');        
      }
    }); 
  }
  
  cancelar() {
    this.dialogRef.close();
  }
  
  validaCampos(): boolean{
    if(!this.id ) { return false;} 			
    if(!this.nome ) { return false;} 		
    if(!this.nomeUsuario ) { return false;} 	
    if(!this.senha) { return false;} 		
    if(!this.tipoUsuario ) { return false;} 	
    if(!this.estadoAtuacao ) { return false;}
    if(!this.status ) { return false;} 		
    if(!this.telefone ) { return false;} 	
    if(!this.usrCadastro ) { return false;} 	
    if(!this.dtCadastro ) { return false;} 

    return true;	
  }
  
}
