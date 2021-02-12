import { Component, OnInit } from '@angular/core';
import { ChartDB } from '../../../fack-db/chart-data';
import {ApexChartService} from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {


  constructor(public apexEvent: ApexChartService) {
    
  }

  ngOnInit() {}

}
