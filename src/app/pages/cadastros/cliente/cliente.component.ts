import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formulario: FormularioAterrissagemComponent;
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  constructor(
    public comunicacao: ComunicacaoBaseService,
    public rotas: Router,
    public configDialog: MatDialog,
    detDialog: MatDialog
  ) {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  filtros = { codigo: '' };

  colunas = [
    { titulo: '#', propriedade: 'id', width: 10 },
    { titulo: 'Nome', propriedade: 'nome', width: 200 },
    { titulo: 'CPF/CNPJ', propriedade: 'cpfCnpj', width: 150 },
    { titulo: 'R.G/I.E', propriedade: 'rgIe', width: 150 },
    { titulo: 'Telefone', propriedade: 'telefone', width: 150 },
    { titulo: 'E-Mail', propriedade: 'email', width: 150 },
    { titulo: 'Cep', propriedade: 'cep', width: 150 },
    { titulo: 'Estado', propriedade: 'estado', width: 150 },
    { titulo: 'Cidade', propriedade: 'cidade', width: 150 },
    { titulo: 'Endereco', propriedade: 'logradouro', width: 150 },
    { titulo: 'Complemento', propriedade: 'complemento', width: 150 },
    { titulo: 'Usr. Cadastro', propriedade: 'usrCadastro', width: 150 },
    { titulo: 'Dt. Cadastro', propriedade: 'dtCadastro', width: 150 },
    { titulo: 'Ações', propriedade: 'acoes', width: 150 }
  ];

  acoes = [
    { icone: 'feather icon-edit', evento: this.detalheCliente.bind(this) },
    { icone: 'feather icon-trash-2', evento: this.excluir.bind(this) },
  ];

  ngOnInit() {
  }

  pesquisar() {
    this.formulario.pesquisar();
  }

  detalheCliente(row: any) {
    let dados = {
      cliente: row,
      enderecos: undefined
    }

    this.comunicacao.get(`api/enderecos/obter-enderecos-entrega/pesquisar?codCliente=${dados.cliente.id === undefined ? 0 : dados.cliente.id}`).then((result: any) => {
      if (result.success) {
        dados.enderecos = result.data;
        
        const detRef = this.configDialog.open(ClienteDetalheComponent, { width: '1500px', height: '900px', panelClass: 'cdk-overlay-container', disableClose: true, data: dados })
          .addPanelClass('painel-class');
        detRef.afterClosed().subscribe(result => {
          if (result) {
            this.pesquisar();
          }
        });
      }
    })
  }

  excluir(row: any) {
    this.comunicacao.delete('api/cliente/excluir-cliente', { dados: { id: row.id } }).then((result: any) => {
      if (result.success) {
        alert(result.data)
        this.pesquisar();
      }
    });
  }
}
