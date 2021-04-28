import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbAccordionModule, NgbCollapseModule, NgbButtonsModule, NgbPaginationModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule  } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap'
import { loginComponent } from './login.component';

const routs: Routes = [
  {
    path: '',
    component: loginComponent,
    children: [
      {
        path: 'login',
        component: loginComponent,
      },
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
    NgbModule
  ],
  providers: [ ],
  declarations: [
    loginComponent
  ],
  exports: [RouterModule]
})

export class LoginModule { }
