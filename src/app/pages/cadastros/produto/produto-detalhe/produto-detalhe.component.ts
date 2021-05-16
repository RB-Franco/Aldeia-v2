import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ComunicacaoBaseService } from 'src/app/theme/shared/services/comunicationService/comunicacao-base.service';
import { DropdownService } from 'src/app/theme/shared/services/dropdownService/dropdown.service';
import swal from 'sweetalert2';
import { NextConfig } from '../../../../app-config';
import { ProdutoComponent } from '../produto.component';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  id: any;
  descricao: any;
  unidadeMedida: any;
  foto: any;
  usrCadastro: any;
  dtCadastro: any;

  fileData: File = null;
  previewUrl: any = null;

  constructor(
    private comunicacao: ComunicacaoBaseService,
    private titleService: Title,
    public dialogRef: MatDialogRef<ProdutoComponent>,
    public configDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dropdowService: DropdownService) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    if (data !== undefined) {
      this.id = data.id,
        this.descricao = data.descricao,
        this.unidadeMedida = data.unidadeMedida,
        this.previewUrl = data.preview,
        this.usrCadastro = data.usrCadastro,
        this.dtCadastro = data.dtCadastro
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro produto');
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
    if(!this.validarProduto() ){
      swal('Atenção', 'Informe os dados do produto!', 'warning');
      return;
    }

    let produto = {
      id: undefined,
      descricao: this.descricao,
      unidadeMedida: this.unidadeMedida,
      foto: this.foto,
      usrCadastro: this.usrCadastro,
      dtCadastro: this.dtCadastro,
      preview: this.previewUrl
    }

    if (this.id !== undefined) {
      produto.id = this.id;
      this.comunicacao.put('api/produto/atualizar-produto', { dados: produto }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
        }
      });
    } else {
      produto.usrCadastro = 'supervisor';
      this.comunicacao.post('api/produto/cadastrar-produto', { dados: produto }).then((result: any) => {
        if (result.success) {
          this.dialogRef.close(result.success);
          produto = result.data;
        }
      });
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    if (!this.fileData) {
      this.previewUrl = undefined;
      return;
    }

    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  excluir() {
    this.comunicacao.delete('api/produto/excluir-produto', { dados: { id: this.id } }).then((result: any) => {
      if (result.success) {
        this.novo();
      }
    });
  }
  novo() {
    this.id = undefined;
    this.descricao = undefined;
    this.unidadeMedida = undefined;
    this.previewUrl = undefined;
    this.usrCadastro = undefined;
    this.dtCadastro = undefined;
  }

  validarProduto() {
    if (!this.descricao) { return false; }
    if (!this.unidadeMedida) { return false; }
    return true;
  }
}
