import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NextConfig} from '../../../../app-config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-catalogo-detalhe',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrls: ['./catalogo-detalhe.component.scss']
})

export class CatalogoDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  idCatalogo: any;
  rotaAtual: any;
  title = "teste";
  constructor(
    private rotas: Router,
    private route: ActivatedRoute,
    private titleService: Title
    )
  {
     this.nextConfig = NextConfig.config;
     this.windowWidth = window.innerWidth;

  }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro catalogo');

     this.route.params.subscribe((objeto: any) => {
        this.idCatalogo = objeto.id;
     })

     this.route.queryParams.subscribe(params => {
       this.rotaAtual = params.rotaAtual;
     });
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }

  voltarRota(){
    this.rotas.navigate([this.rotaAtual]);
  }
  excluir(){
    
  }
}
