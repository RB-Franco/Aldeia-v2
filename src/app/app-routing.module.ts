import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
  
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
        pathMatch: 'full'
      }

    ]
  },
   {
     path: '',
     component: AdminComponent,
     children: [
       {
         path: '',
         loadChildren: './inicio/inicio.module#InicioModule'
       },
       {
         path: 'pages',
         loadChildren:  './pages/pages.module#PagesModule'
       }
     ], 
     canActivate: []
   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
