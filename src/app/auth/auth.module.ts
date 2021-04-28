import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { AuthComponent } from './auth.component';
import { ComunicaoService } from '../theme/shared/_data-service/comunicacao-service';
import { ComunicacaoBaseService } from '../theme/shared/services/comunicacao-base.service';

@NgModule({
	declarations: [
		AuthComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		LoginModule
	],
	providers: [ComunicaoService, 
				ComunicacaoBaseService]
})

export class AuthModule {
}
