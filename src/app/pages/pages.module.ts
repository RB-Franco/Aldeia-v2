import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroModule } from './cadastros/cadastros.module';
import { VendasModule } from './vendas/vendas.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
	declarations: [
		PagesComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		CadastroModule,
		VendasModule,
		NgxDatatableModule
	],
	entryComponents: [],
	providers: []
})

export class PagesModule {
}
