import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
	{
		path: '?',
		component: PagesComponent,
	},
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'cadastros',
				loadChildren: './cadastros/cadastros.module#CadastroModule'
			},
			{
				path: 'vendas',
				loadChildren: './vendas/vendas.module#VendasModule'
			}
		]
	}

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
