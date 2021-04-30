import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { AuthComponent } from './auth.component';
import { ComunicacaoBaseService } from '../theme/shared/services/comunicationService/comunicacao-base.service';

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
	providers: [ComunicacaoBaseService]
})

export class AuthModule {
}
