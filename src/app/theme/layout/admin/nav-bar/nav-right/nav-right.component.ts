import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})

export class NavRightComponent implements OnInit {
  router: Router;

  constructor(public rotas: Router) { 
    this.router = rotas;
  }

  ngOnInit() { 

  }
  
  sair(){
    window.location.reload();
  }
}
