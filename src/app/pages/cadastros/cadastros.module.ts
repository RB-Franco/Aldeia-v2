import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { CatalogoDetalheComponent } from './catalogo/catalogo-detalhe/catalogo-detalhe.component';
import { NgbAccordionModule, NgbCollapseModule, NgbButtonsModule, NgbPaginationModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule  } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap'
import { ClienteComponent } from './cliente/cliente.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ProdutoComponent } from './produto/produto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ClienteDetalheComponent } from './cliente/cliente-detalhe/cliente-detalhe.component';
import { EmpresaDetalheComponent } from './empresa/empresa-detalhe/empresa-detalhe.component';
import { FornecedorDetalheComponent } from './fornecedor/fornecedor-detalhe/fornecedor-detalhe.component';
import { ProdutoDetalheComponent } from './produto/produto-detalhe/produto-detalhe.component';
import { UsuarioDetalheComponent } from './usuario/usuario-detalhe/usuario-detalhe.component';

const routs: Routes = [
  {
    path: '',
    component: CadastrosComponent,
    children: [
      {
        path: 'catalogo',
        component: CatalogoComponent,
      },
      {
        path: 'catalogo/catalogo-detalhe',
        component: CatalogoDetalheComponent,
      },
      {
        path: 'cliente',
        component: ClienteComponent,
      },
      {
        path: 'empresa',
        component: EmpresaComponent,
      },
      {
        path: 'fornecedor',
        component: FornecedorComponent,
      },
      {
        path: 'produto',
        component: ProdutoComponent,
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
      }
    ]

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routs),
    ModalModule.forRoot(),
    BootstrapModalModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbButtonsModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgbCollapseModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
          hasBackdrop: true,
          panelClass: 'm-mat-dialog-container__wrapper',
          height: 'auto',
          width: '900px'
      }
  }
  ],
  declarations: [
    CadastrosComponent,
    CatalogoComponent,
    CatalogoDetalheComponent,
    ClienteComponent,
    EmpresaComponent,
    FornecedorComponent,
    ProdutoComponent,
    UsuarioComponent,
    ClienteDetalheComponent,
    EmpresaDetalheComponent,
    FornecedorDetalheComponent,
    ProdutoDetalheComponent,
    UsuarioDetalheComponent
  ],
  exports: [RouterModule],
  entryComponents: [CatalogoDetalheComponent],
})

export class CadastroModule { }

window.onunload = () => {
  //localStorage.clear();
}