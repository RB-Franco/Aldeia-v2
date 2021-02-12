import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'begin/inicio',
        pathMatch: 'full'
      },
      {
        path: 'begin',
        loadChildren: () => import('./pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'pages',
        loadChildren:  './pages/pages.module#PagesModule'
      }
      // ,
      // {
      //   path: 'venda',
      //   loadChildren: () => import('./pages/vendas/vendas.module').then(module => module.VendasModule)
      // },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
