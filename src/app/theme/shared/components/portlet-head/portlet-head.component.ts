import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mx-portlet-head',
  templateUrl: './portlet-head.component.html' ,
  styleUrls: ['./portlet-head.component.scss']
})
export class PortletHeadComponent implements OnInit {
  @Output() clicar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clique(evento) {

    this.clicar.emit(evento);
  }
}
