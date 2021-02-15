import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NextConfig} from '../../../../app-config';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss']
})
export class UsuarioDetalheComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  idCatalogo: any;
  rotaAtual: any;
  rota: any;
  constructor(
    private rotas: Router,
    private route: ActivatedRoute
  ) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    this.rota = rotas;
   }

  ngOnInit() {
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
   this.rota.navigate([this.rotaAtual]);
 }

}
