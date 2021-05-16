import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { NextConfig } from '../../../../app-config';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { CatalogoComponent } from '../catalogo.component';
import swal from 'sweetalert2';
import { FormularioAterrissagemComponent } from 'src/app/theme/shared/components/formulario-aterrissagem/formulario-aterrissagem.component';
import { CatalogoDetalheAdicionaProdComponent } from './catalogo-detalhe-adiciona-prod/catalogo-detalhe-adiciona-prod.component';

@Component({
  selector: 'app-catalogo-detalhe',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrls: ['./catalogo-detalhe.component.scss']
})

export class CatalogoDetalheComponent implements OnInit {  
  @ViewChild(FormularioAterrissagemComponent, { static: true }) formularioProd: FormularioAterrissagemComponent;
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  fornecedores: any;
  produtos: any;

  //catalogo
  id: any;
  descricaoCatalogo: any;
  fornecedorId: any;
  usrCadastro: any;
  dtCadastro: any;

  //Produto
  idProd: any;
  codProduto: any;
  usrCadastroProd: any;

  listProdutos = [];
  listReferencias = [];
  listLinhas = [];

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private titleService: Title,
    public dialogRef: MatDialogRef<CatalogoComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    
    if(data.id !== undefined){
      this.id = data.id;
      this.descricaoCatalogo = data.descricao;      
      this.fornecedorId = data.fornecedorId;
      this.usrCadastro = data.usrCadastro;
      this.dtCadastro = data.dtCadastro;
    }
  }
  colunasProdutos = [
    { titulo: 'Produto', propriedade: 'descProduto', width: 450 },
    { titulo: 'Referência', propriedade: 'descReferencia', width: 300 },
    { titulo: 'linha', propriedade: 'linha', width: 200 },
    { titulo: 'Valor', propriedade: 'valor', width: 200 }
  ];
  acoesProdutos = [{ titulo: 'Ação', icone: 'feather icon-trash-2', centralizarHeader: true, centralizarValor: true, evento: this.excluir.bind(2, this) }];

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro catalogo');
    this.comunicacao.get('api/fornecedor/obter-fornecedores/pesquisar').then((result: any) => {
      this.fornecedores = result.data;
    });
    this.comunicacao.get('api/produto/obter-produtos/pesquisar').then((result: any) => {
      this.produtos = result.data;
    });
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  salvar() {
     
    if(!this.descricaoCatalogo || !this.fornecedorId){
      swal('Atenção', 'Informe os dados do catalogo', 'error');
      return;
    }
    let catalogo = {
      id: this.id,
      descricao: this.descricaoCatalogo,
      fornecedorId: this.fornecedorId,
      usrCadastro: this.usrCadastro
    }    

    if (this.id !== undefined) {
      catalogo.id = this.id;
      this.comunicacao.put('api/catalogo/atualizar-catalogo', { dados: catalogo }).then((result: any) => {
        if (result.success) {          
          //this.dialogRef.close();
        }
      });
    } else {
      catalogo.usrCadastro = 'supervisor';
      this.comunicacao.post('api/catalogo/cadastrar-catalogo', { dados: catalogo }).then((result: any) => {
        if (result.success) {
          //this.dialogRef.close();
          catalogo = result.data;
        }
      });
    }


  }
  novo(){
    this.id = undefined;
    this.descricaoCatalogo = undefined;
    this.fornecedorId = undefined;
    this.usrCadastro = undefined;
    this.dtCadastro = undefined;
  }

  excluir() {
    if(this.id === undefined) {return;}

    this.comunicacao.delete('api/catalogo/excluir-catalogo', {dados: { id: this.id}}).then((result: any) => { 
      if(result.success){
        alert(result.data)
        this.formularioProd.pesquisar();
      }
    });
  }
  cancelar() {
    this.dialogRef.close();
  }

  adicionarProduto(row: any) {       
    const detRef = this.configDialog
                        .open(CatalogoDetalheAdicionaProdComponent, { width: '70%', height:'80%',panelClass: 'cdk-overlay-container' ,  disableClose:true})
                        .addPanelClass('painel-class');
    detRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.listReferencias = result.listaReferencias;
        this.listLinhas = result.listaLinhas;

        this.montaListaProdutos()
        this.formularioProd.pesquisar();
      }
    });
  }
  
  montaListaProdutos(){    
    this.listLinhas.forEach(element => {
      let ref = this.listReferencias.find(r => r.codigo === element.codigoReferencia);
      let prod = this.produtos.find(p => p.id === element.codProduto);
      this.listProdutos.push({ 
        id: this.idProd,
        catalogoId: this.id,
        produtoId: element.codProduto,
        descProduto: `${prod.id} - ${prod.descricao}`,
        codReferencia: element.codigoReferencia,
        descReferencia: `${ref.descricao} - ${ref.tamanho}`,
        linha: element.linha,
        valor: element.valor });
    });
  }
}
