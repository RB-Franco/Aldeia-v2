import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
       {
         path: '',
         redirectTo: '/inicio',
         pathMatch: 'full'
       },
      {
        path: '',
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      {
        path: 'pages',
        loadChildren:  './pages/pages.module#PagesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
