import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label, ThemeService } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  pull_data: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0],barThickness: 16,
      barPercentage: 0.5, label: 'Price Submitted $',backgroundColor:'purple' , borderColor: 'green',fill:false }
  ];
  lineChartLabels: any = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            beginAtZero: true
          }
      }],
    },
  };
  lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(73,79,253,0.9)',
      borderColor: 'rgba(77,83,96,1)',
    },
  ];
  lineChartLegend = false;
  lineChartType = 'bar'; 
  productCount: any;
  submittedCount: any;
  requestedCount: any;
  requestedPrices: any;
  requestedcollections: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAdminHome();
  }
  getAdminHome() {
    this.spinner.show();
    this.api.get('getAdminHome').subscribe((data)=> {
      if(!data.Error) {
        this.productCount = data.data.products;
        this.submittedCount = data.data.submitted;
        this.requestedCount = data.data.requested;
        this.requestedPrices = data.data.newrequested;
        this.requestedcollections = data.data.collections;
        for (let index = 0; index < data.data.submittedd.length; index++) {
          this.pull_data[0].data[index] = Number(data.data.submittedd[index].price_you_saw);
          this.lineChartLabels[index] = data.data.submittedd[index].model;
        }
      }
    })
  }
}
