import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  
  constructor(private rotas: Router, private route: ActivatedRoute, private titleService: Title) {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
   }

  ngOnInit() {
    this.titleService.setTitle('Aldeia - Cadastro usuario');

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

}
