import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(module => module.UsuarioModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(module => module.EmpresaModule)
      },
      {
        path: 'fornecedor',
        loadChildren: () => import('./fornecedor/fornecedor.module').then(module => module.FornecedorModule)
      },
      {
        path: 'catalogo',
        loadChildren: () => import('./catalogo/catalogo.module').then(module => module.CatalogoModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(module => module.ClienteModule)
      },
      {
        path: 'produto',
        loadChildren: () => import('./produto/produto.module').then(module => module.ProdutoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
