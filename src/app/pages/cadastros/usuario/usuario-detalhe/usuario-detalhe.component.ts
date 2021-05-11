import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import {NextConfig} from '../../../../app-config';
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

  listStatus = [
    {valor: 0, descricao: 'Ativo'},
    {valor: 1, descricao: 'Inativo'}
  ]

  constructor( 
    private comunicacao: ComunicacaoBaseService,
    private titleService: Title,
    public dialogRef: MatDialogRef<UsuarioComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) 
  {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;

      if (data !== undefined) {
        this.id= data.id,
        this.nome= data.nome,
        this.nomeUsuario= data.nomeUsuario,
        this.senha= data.senha,
        this.tipoUsuario= data.tipoUsuario,
        this.estadoAtuacao= data.estadoAtuacao,
        this.status= data.status,
        this.telefone= data.telefone,
        this.usrCadastro= data.usrCadastro,
        this.dtCadastro= data.dtCadastro
      }
  
   }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro usuario');
    this.dropdowService.getEstadoBr().subscribe(dados => {this.estados = dados});
    this.dropdowService.gettipoUsuarios().subscribe(dados => {this.tipoUsuarios = dados});
 }

 navMobCollapse() {
   if (this.windowWidth < 992) {
     this.onNavMobCollapse.emit();
   }
 }

 cancelar(){
   this.dialogRef.close();
 }
 salvar()
 {
   let usuario ={
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

   if(this.id !== undefined){
    usuario.id = this.id;
    this.comunicacao.put('api/usuarios/atualizar-usuario', {dados: usuario}).then((result: any) => {
      if(result.success){        
        this.dialogRef.close();
      }
     });    
   }else {     
     usuario.usrCadastro = 'supervisor';
     usuario.dtCadastro = Date.now;
    this.comunicacao.post('api/usuarios/cadastrar-usuario', {dados: usuario}).then((result: any) => { 
      if(result.success){
        this.dialogRef.close();
        usuario = result.data;
      }
    }); 
   }
   
 }

}
