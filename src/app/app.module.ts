import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationComponent } from './theme/layout/admin/side-bar/navigation.component';
import { NavContentComponent } from './theme/layout/admin/side-bar/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/side-bar/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/side-bar/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/side-bar/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/side-bar/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroModule } from './pages/cadastros/cadastros.module';
import { VendasModule } from './pages/vendas/vendas.module';
import { AuthSigninComponent } from './login/auth-signin.component';
import { AuthService } from './login/auth.service';
import { InicioModule } from './inicio/inicio.module';

@NgModule({
  declarations: [
    AuthSigninComponent,
    AppComponent,
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    MatDialogModule,
    InicioModule,
    CadastroModule,
    VendasModule
  ],
  providers: [NavigationItem, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

