import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, DebugElement } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

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
    { titulo: 'Dt. Cadastro', propriedade: 'dataCadastro', width: 150 },
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
    this.modelo = data;
    this.dataEnderecosEntrega = `api/enderecos/obter-enderecos-entrega/pesquisar?codCliente=${this.modelo.id === undefined ? 0 : this.modelo.id}`; 
    
    if(data !== undefined && data !== 0){
      this.cli_id = data.id,
      this.cli_nome = data.nome,
      this.cli_cpfCnpj = data.CpfCpj,
      this.cli_rgIe = data.rgIe,
      this.cli_telefone = data.telefone,
      this.cli_email = data.email,
      this.cli_cep = data.cep,
      this.cli_estado = data.estado.toUpperCase(),
      this.cli_cidade = data.cidade,
      this.cli_logradouro = data.logradouro,
      this.cli_complemento = data.complemento,  
      this.cli_usrCadastro = data.usrCadastro,
      this.cli_dtCadastro = data.dtCadastro 
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
    this.dialogRef.close(false);
  }

  salvar() {
    let cliente = {
      id: this.cli_id,
      nome: this.cli_nome,
      cpfCpj: this.cli_cpfCnpj,
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
          //this.dialogRef.close();
        }
      });
    } else {
      cliente.usrCadastro = 'supervisor';
      this.comunicacao.post('api/cliente/cadastrar-cliente', { dados: cliente }).then((result: any) => {
        if (result.success) {
          //this.dialogRef.close();
          cliente = result.data;
          this.cli_id = cliente.id;
        }
      });
    }
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
      //this.toastr.warning('Informe um CEP','Atenção', {timeOut: 2000})
      this.menssagem.exibaToastAlerta('Informe o CEP do endereço de entrega');
      // alert("informe um CEP")
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
  salvarEndEntrega(){ 
    if(this.cli_id === undefined) { 
      swal(
        'Atenção',
        'Para gravar endereço de entrega, salve os dados do cliente!',
        'info'
      );
      return;
    }
    let endereco = {
      cep: this.end_cep,
      estado: this.end_estado,
      cidade: this.end_cidade,
      logradouro: this.end_logradouro,
      complemento: this.end_complemento,  
      obsEndereco: this.end_obsEndereco,
      clienteId: this.cli_id,
      usrCadastro: 'supervisor'
    }

    this.comunicacao.post(`api/enderecos/cadastrar-enderecos-entrega-cliente`, { dados: endereco}).then((result: any) => {
      if (result.success) {      
        this.end_cep = '';
        this.end_estado  = '';
        this.end_cidade  = '';
        this.end_logradouro  = '';
        this.end_complemento  = ''; 
        this.end_obsEndereco ='';       
      }
    })
    this.dataEnderecosEntrega = `api/enderecos/obter-enderecos-entrega/pesquisar?codCliente=${this.modelo.id === undefined ? 0 : this.modelo.id}`; 
    this.formulario.pesquisar()
  }

  excluirEndEntrega(row: any) {
    let endereco = {
      id: row.id
    }
    this.comunicacao.delete('api/enderecos/excluir-enderecos-entrega', { dados: endereco }).then((result: any) => {
      if (result.success) {      
        this.dataEnderecosEntrega = `api/enderecos/obter-enderecos-entrega/pesquisar?codCliente=${this.modelo.id === undefined ? 0 : this.modelo.id}`; 
        this.formulario.pesquisar()     
      }
    })
  }  
}
