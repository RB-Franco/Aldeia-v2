import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NextConfig} from '../../../app-config';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.scss']
})
export class DetalhePedidoComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  idCatalogo: any;
  rotaAtual: any;
  
  constructor(private rotas: Router, private route: ActivatedRoute) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
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
   this.rotas.navigate([this.rotaAtual]);
 }
 
 excluir(){

 }

}
