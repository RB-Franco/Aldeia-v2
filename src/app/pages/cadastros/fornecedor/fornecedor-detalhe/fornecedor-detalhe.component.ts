import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { MensagensService } from 'src/app/theme/shared/services/comunicationService/mensagens.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import swal from 'sweetalert2';
import { NextConfig } from '../../../../app-config';
import { FornecedorComponent } from '../fornecedor.component';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html',
  styleUrls: ['./fornecedor-detalhe.component.scss']
})

export class FornecedorDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  id: any;
  descricao: any;
  cnpj: any;
  ie: any;
  telefone: any;
  email: any;

  cep: any;
  estado: any;
  cidade: any;
  logradouro: any;
  complemento: any;
  
  cepEntrega: any;
  estadoEntrega: any;
  cidadeEntrega: any;
  logradouroEntrega: any;
  complementoEntrega: any;
  estadoAtuacao: any;
  usrCadastro: any;
  dtCadastro: any;

  estados: any;

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private menssagem: MensagensService,
    private titleService: Title,
    public dialogRef: MatDialogRef<FornecedorComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) 
  {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    
    if(data !== undefined){
      this.id = data.id,
      this.descricao = data.descricao,
      this.cnpj = data.cnpj,
      this.ie = data.ie,
      this.telefone = data.telefone,
      this.email = data.email,
      this.cep = data.cep,
      this.estado = data.estado,
      this.cidade = data.cidade,
      this.logradouro = data.logradouro,
      this.complemento = data.complemento,
      this.cepEntrega = data.cepEntrega,
      this.estadoEntrega = data.estadoEntrega,
      this.cidadeEntrega = data.cidadeEntrega,
      this.logradouroEntrega = data.logradouroEntrega,
      this.complementoEntrega = data.complementoEntrega,
      this.estadoAtuacao = data.estadoAtuacao,
      this.usrCadastro = data.usrCadastro,
      this.dtCadastro = data.dtCadastro
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro fornecedor');
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
    if(!this.validaFornecedor()){
      swal('Atenção', 'Informe os dados do fornecedor', 'warning');
      return;
    }
    
    let fornecedor = {
      id: this.id,
      descricao: this.descricao,
      cnpj: this.cnpj,
      ie: this.ie,
      telefone: this.telefone,
      email: this.email,      
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      logradouro: this.logradouro,
      complemento: this.complemento,      
      cepEntrega: this.cepEntrega,
      estadoEntrega: this.estadoEntrega,
      cidadeEntrega: this.cidadeEntrega,
      logradouroEntrega: this.logradouroEntrega,
      complementoEntrega: this.complementoEntrega,
      estadoAtuacao: this.estadoAtuacao,
      usrCadastro: this.usrCadastro,
      dtCadastro: this.dtCadastro
    }    

    if (this.id !== undefined) {
      fornecedor.id = this.id;
      this.comunicacao.put('api/fornecedor/atualizar-fornecedor', { dados: fornecedor }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(true);
        }
      });
    } else {
      fornecedor.usrCadastro = 'supervisor';
      this.comunicacao.post('api/fornecedor/cadastrar-fornecedor', { dados: fornecedor }).then((result: any) => {
        if (result.success) {
          fornecedor = result.data;
          this.dialogRef.close(true);
        }
      });
    }
  }
  validaCep(principal: boolean) {    
    let compMsg: String;
    let cep: any;
    if(principal){ 
      compMsg = 'principal';
      cep = this.cep;
    }else{
      compMsg = 'de entrega';
      cep = this.cepEntrega;
    }
    
    if(cep === undefined) {       
      this.menssagem.exibaToastAlerta(`Informe o CEP do endereço ${compMsg}`);
      return;
    }

    this.comunicacao.post(`api/enderecos/valida-cep?cep=${principal? this.cep : this.cepEntrega}`).then((result: any) => {
      if (result.success) {  
        if(principal){ 
          this.estado = result.data.uf;
          this.cidade = result.data.localidade;
          this.logradouro = result.data.logradouro;
          this.complemento = result.data.complemento;
        }else{
          this.estadoEntrega = result.data.uf;
          this.cidadeEntrega = result.data.localidade;
          this.logradouroEntrega = result.data.logradouro;
          this.complementoEntrega = result.data.complemento;
        }
      }
    })
  }

  excluir(){
    this.comunicacao.delete('api/fornecedor/excluir-fornecedor', {dados: { id: this.id}}).then((result: any) => { 
      if(result.success){
        this.novo();
      }
    });
  }
  novo(){
    this.id = undefined; 
    this.descricao = undefined; 
    this.cnpj = undefined; 
    this.ie = undefined; 
    this.telefone = undefined; 
    this.email = undefined; 
    this.cep = undefined; 
    this.estado = undefined; 
    this.cidade = undefined;
    this.logradouro = undefined; 
    this.complemento = undefined; 
    this.cepEntrega = undefined; 
    this.estadoEntrega = undefined; 
    this.cidadeEntrega = undefined; 
    this.logradouroEntrega = undefined; 
    this.complementoEntrega = undefined; 
    this.estadoAtuacao = undefined; 
    this.usrCadastro = undefined; 
    this.dtCadastro = undefined; 
  }

  validaFornecedor(){
    if(!this.descricao) { return false;} 
    if(!this.cnpj) { return false;} 
    if(!this.ie) { return false;} 
    if(!this.telefone) { return false;} 
    if(!this.email) { return false;} 
    if(!this.cep) { return false;} 
    if(!this.estado) { return false;} 
    if(!this.cidade) { return false;}
    if(!this.logradouro) { return false;} 
    if(!this.estadoAtuacao) { return false;} 

    return true;
  }
}
