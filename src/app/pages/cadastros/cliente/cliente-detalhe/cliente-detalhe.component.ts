import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, DebugElement } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { MensagensService } from 'src/app/theme/shared/services/comunicationService/mensagens.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import swal from 'sweetalert2';
import { NextConfig } from '../../../../app-config';
import { ClienteComponent } from '../cliente.component';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})

export class ClienteDetalheComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formulario: FormularioAterrissagemComponent;
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  modelo: any;
  dataEnderecosEntrega: any;
  rotaAtual: any;

  adicionouEndereco: boolean = false;

  cli_id: any;
  cli_nome: any;
  cli_cpfCnpj: any;
  cli_rgIe: any;
  cli_telefone: any;
  cli_email: any;
  cli_cep: any;
  cli_estado: any;
  cli_cidade: any;
  cli_logradouro: any;
  cli_complemento: any;
  cli_usrCadastro: any;
  cli_dtCadastro: any;

  listaEnderecoEntrega = [];
  end_cep: any;
  end_estado: any;
  end_cidade: any;
  end_logradouro: any;
  end_complemento: any;  
  end_clienteId: any;
  end_usrCadastro: any;
  end_obsEndereco: any;

  estados: any;

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10 },
    { titulo: 'CEP', propriedade: 'cep', width: 200 },
    { titulo: 'Estado', propriedade: 'estado', width: 150 },
    { titulo: 'Cidade', propriedade: 'cidade', width: 150 },
    { titulo: 'Logradouro', propriedade: 'logradouro', width: 150 },
    { titulo: 'Complemento', propriedade: 'complemento', width: 150 },
    { titulo: 'Obs. Endereço', propriedade: 'obsEndereco', width: 150 },
    { titulo: 'Usr. Cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Dt. Cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acoes', width: 150 }
  ];

  acoes = [
    { icone: 'feather icon-trash-2', evento: this.excluirEndEntrega.bind(this) },
  ];

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private menssagem: MensagensService,
    private titleService: Title,
    public dialogRef: MatDialogRef<ClienteComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) 
  {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;

    this.modelo = data.cliente;
    this.listaEnderecoEntrega = data.enderecos;

    if(this.modelo !== undefined && this.modelo !== 0){
      this.cli_id = this.modelo.id,
      this.cli_nome = this.modelo.nome,
      this.cli_cpfCnpj = this.modelo.cpfCnpj,
      this.cli_rgIe = this.modelo.rgIe,
      this.cli_telefone = this.modelo.telefone,
      this.cli_email = this.modelo.email,
      this.cli_cep = this.modelo.cep,
      this.cli_estado = this.modelo.estado.toUpperCase(),
      this.cli_cidade = this.modelo.cidade,
      this.cli_logradouro = this.modelo.logradouro,
      this.cli_complemento = this.modelo.complemento,  
      this.cli_usrCadastro = this.modelo.usrCadastro,
      this.cli_dtCadastro = this.modelo.dtCadastro 
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro cliente');
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
    if(!this.validaCliente()){
      swal('Atenção', 'Informe os dados do cliente!','warning');
      return;
    }
    let cliente = {
      id: undefined,
      nome: this.cli_nome,
      cpfCnpj: this.cli_cpfCnpj,
      rgIe: this.cli_rgIe,
      telefone: this.cli_telefone,
      email: this.cli_email,
      cep: this.cli_cep,
      estado: this.cli_estado,
      cidade: this.cli_cidade,
      logradouro: this.cli_logradouro,
      complemento: this.cli_complemento,  
      usrCadastro: this.cli_usrCadastro,
      dtCadastro: this.cli_dtCadastro    
    }

    if (this.cli_id !== undefined) {
      cliente.id = this.cli_id;
      this.comunicacao.put('api/cliente/atualizar-cliente', { dados: cliente }).then((result: any) => {
        if (result.success) {  
          if(this.adicionouEndereco){
            this.salvarEndEntrega();
          }         
          this.dialogRef.close();
        }
      });
    } else {
      cliente.usrCadastro = 'supervisor';
      this.comunicacao.post('api/cliente/cadastrar-cliente', { dados: cliente }).then((result: any) => {
        if (result.success) {
          cliente = result.data;
          this.cli_id = cliente.id;

          if(this.adicionouEndereco){
            this.salvarEndEntrega();
          }                    
        }
      });
    }    
  }
  
  validaCliente(): boolean{
    if(!this.cli_nome) { return false;} 		
    if(!this.cli_cpfCnpj) { return false;} 		
    if(!this.cli_rgIe) { return false;} 		
    if(!this.cli_telefone) { return false;} 	
    if(!this.cli_email) { return false;} 		
    if(!this.cli_cep) { return false;} 			
    if(!this.cli_estado) { return false;} 		
    if(!this.cli_cidade) { return false;} 		
    if(!this.cli_logradouro) { return false;}
    
    return true;
  }

  validaEnderecoEntrega(): boolean{
    if(!this.end_cep) { return false;}
    if(!this.end_estado) { return false;}
    if(!this.end_cidade) { return false;}
    if(!this.end_logradouro) { return false;}
    
    return true;
  }

  validaCepCliente() {
    if(this.cli_cep === undefined) { 
      this.menssagem.exibaToastAlerta('Informe o CEP do cliente');
      return;
    }
    this.comunicacao.post(`api/enderecos/valida-cep?cep=${this.cli_cep}`).then((result: any) => {
      if (result.success) {      
        this.cli_estado = result.data.uf;
        this.cli_cidade = result.data.localidade;
        this.cli_logradouro = result.data.logradouro;
        this.cli_complemento = result.data.complemento;
      }
    })
  }
  validaCepEndEntrega() {
    if(this.end_cep === undefined) { 
      this.menssagem.exibaToastAlerta('Informe o CEP do endereço de entrega');
      return;
    }
    this.comunicacao.post(`api/enderecos/valida-cep?cep=${this.end_cep}`).then((result: any) => {
      if (result.success) {      
        this.end_estado = result.data.uf;
        this.end_cidade = result.data.localidade;
        this.end_logradouro = result.data.logradouro;
        this.end_complemento = result.data.complemento;
      }
    })
  }

  AdicionarEnderecoNaLista(){       
    if(!this.validaEnderecoEntrega()){
      swal('Atenção', 'Informe os dados do endereço de entrega!','warning');
      return;
    }
    this.listaEnderecoEntrega.push({
      cep: this.end_cep,
      estado: this.end_estado,
      cidade: this.end_cidade,
      logradouro: this.end_logradouro,
      complemento: this.end_complemento,  
      obsEndereco: this.end_obsEndereco,
      clienteId: this.cli_id,
      usrCadastro: 'supervisor',
      dtCadastro: undefined
    });
    this.adicionouEndereco = true;
    this.formulario.pesquisar();
  }

  salvarEndEntrega(){ 
    this.listaEnderecoEntrega.forEach(item => item.clienteId = this.cli_id);
      this.comunicacao.post(`api/enderecos/cadastrar-enderecos-entrega-cliente`, { dados: this.listaEnderecoEntrega}).then((result: any) => {        
        if(result.success){                    
          this.dialogRef.close();
        }
      });
  }

  excluirEndEntrega(row: any) {
    let endereco = {
      id: row.id
    }
    const remove = this.listaEnderecoEntrega.indexOf(row);

    this.comunicacao.delete('api/enderecos/excluir-enderecos-entrega', { dados: endereco }).then((result: any) => {
      if (result.success) {  
        this.listaEnderecoEntrega.splice(remove, 1);
        this.formulario.pesquisar()     
      }
    })
  }  

  excluir() {
    if(this.listaEnderecoEntrega.length > 0){
      this.listaEnderecoEntrega.forEach(item => this.excluirEndEntrega(item));
    }

    this.comunicacao.delete('api/cliente/excluir-cliente', { dados: { id: this.cli_id } }).then((result: any) => {
      if (result.success) {
        this.novo()
      }
    });
  }

  novo(){
    this.cli_id = undefined; 			
    this.cli_nome = undefined; 		
    this.cli_cpfCnpj = undefined; 		
    this.cli_rgIe = undefined; 		
    this.cli_telefone = undefined; 	
    this.cli_email = undefined; 		
    this.cli_cep = undefined; 			
    this.cli_estado = undefined; 		
    this.cli_cidade = undefined; 		
    this.cli_logradouro = undefined; 	
    this.cli_complemento = undefined;  
    this.cli_usrCadastro = undefined; 	
    this.cli_dtCadastro = undefined; 

    this.listaEnderecoEntrega = [];
    this.formulario.limparDataSource();
    this.formulario.pesquisar();
  }
}
