import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {


  constructor(
    private router: Router
    ) { }


  ngOnInit() {
     this.router.events.subscribe((evt) => {
       if (!(evt instanceof NavigationEnd)) {
         return;
       }
      window.scrollTo(0, 0);
    });
  }

}
