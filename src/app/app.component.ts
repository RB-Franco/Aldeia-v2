import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import { CatalogoDetalheComponent } from './pages/cadastros/catalogo/catalogo-detalhe/catalogo-detalhe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    public configDialog: MatDialog,
    public detDialog: MatDialog,
    public relatorioDialogo: MatDialog) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  Abrir(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true ;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '20%', right: '30%', left: '30%', bottom: '30%'};
      dialogConfig.width = '680px';
    this.configDialog.open(CatalogoDetalheComponent, dialogConfig);
  }
}
