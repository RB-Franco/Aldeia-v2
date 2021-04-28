import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/theme/shared/services/login.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})

export class NavRightComponent implements OnInit {
  router: Router;

  constructor(private authSevice: AuthService) { 
   
  }

  ngOnInit() { 

  }
  
  sair(){
    this.authSevice.fazerLogout();
  }
}
