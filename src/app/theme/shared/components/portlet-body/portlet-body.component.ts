import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mx-portlet-body',
  templateUrl: './portlet-body.component.html'
})
export class PortletBodyComponent implements OnInit {
  @Input() padding = true;

  constructor() { }

  ngOnInit() {
  }

}
