import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { MensagensService } from 'src/app/theme/shared/services/comunicationService/mensagens.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import swal from 'sweetalert2';
import { NextConfig } from '../../../../app-config';
import { UsuarioComponent } from '../../usuario/usuario.component';
import { EmpresaComponent } from '../empresa.component';
@Component({
  selector: 'app-empresa-detalhe',
  templateUrl: './empresa-detalhe.component.html',
  styleUrls: ['./empresa-detalhe.component.scss']
})
export class EmpresaDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  id: any;
  descricao: any;
  cnpj: any;
  telefone: any;
  cep: any;
  estado: any;
  cidade: any;
  logradouro: any;
  complemento: any;
  email: any;
  usrCadastro: any;
  dtCadastro: any;

  estados: any;

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private menssagem: MensagensService,
    private titleService: Title,
    public dialogRef: MatDialogRef<EmpresaComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;

    if (data !== undefined) {
      this.id = data.id,
        this.descricao = data.descricao,
        this.cnpj = data.cnpj,
        this.telefone = data.telefone,
        this.cep = data.cep,
        this.estado = data.estado,
        this.cidade = data.cidade,
        this.logradouro = data.logradouro,
        this.complemento = data.complemento,
        this.email = data.email,
        this.usrCadastro = data.usrCadastro,
        this.dtCadastro = data.dtCadastro
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro empresa');
    this.dropdowService.getEstadoBr().subscribe(dados => this.estados = dados);
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  cancelar() {
    this.dialogRef.close(true);
  }

  salvar() {
    debugger;
    if(!this.validaEmpresa()){
      swal('Alerta', 'Informe os dados da empresa', 'warning');
      return;
    }

    let empresa = {
      id: this.id,
      descricao: this.descricao,
      cnpj: this.cnpj,
      telefone: this.telefone,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      logradouro: this.logradouro,
      complemento: this.complemento,
      email: this.email,
      usrCadastro: this.usrCadastro,
      dtCadastro: this.dtCadastro
    }

    if (this.id !== undefined) {
      empresa.id = this.id;
      this.comunicacao.put('api/empresa/atualizar-empresa', { dados: empresa }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
        }
      });
    } else {
      empresa.usrCadastro = 'supervisor';
      empresa.dtCadastro = Date.now;
      this.comunicacao.post('api/empresa/cadastrar-empresa', { dados: empresa }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
          empresa = result.data;
        }
      });
    }
  }

  validaCep() {
    if(this.cep === undefined) { 
      this.menssagem.exibaToastAlerta('Informe o CEP do cliente');
      return;
    }
    this.comunicacao.post(`api/enderecos/valida-cep?cep=${this.cep}`).then((result: any) => {
      if (result.success) {      
        this.estado = result.data.uf;
        this.cidade = result.data.localidade;
        this.logradouro = result.data.logradouro;
        this.complemento = result.data.complemento;
      }
    })
  }

  validaEmpresa(){
    if(!this.descricao) { return false;} 
    if(!this.cnpj) { return false;} 
    if(!this.cep) { return false;} 
    if(!this.estado) { return false;} 
    if(!this.cidade) { return false;} 
    if(!this.logradouro) { return false;} 
    
    return true;
  }

  novo(){
    this.id= undefined;
    this.descricao= undefined;
    this.cnpj= undefined;
    this.telefone= undefined;
    this.cep= undefined;
    this.estado= undefined;
    this.cidade= undefined;
    this.logradouro= undefined;
    this.complemento= undefined;
    this.email= undefined;
    this.usrCadastro= undefined;
    this.dtCadastro= undefined;
  }

  excluir(){ 
    if(!this.id) { return; }
    this.comunicacao.delete('api/empresa/excluir-empresa', {dados: { id: this.id}}).then((result: any) => { 
      if(result.success){        
        this.novo();        
      }
    }); 
  }
}
