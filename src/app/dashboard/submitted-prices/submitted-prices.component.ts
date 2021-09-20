import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-submitted-prices',
  templateUrl: './submitted-prices.component.html',
  styleUrls: ['./submitted-prices.component.css']
})
export class SubmittedPricesComponent implements OnInit {

  submitted: any;
  dtOptions: any = {};

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      order : [0, 'desc'],
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_"
     },
    };
    this.getSubmittedPrices('all');
  }
  getSubmittedPrices(term) {
    this.spinner.show();
    this.api.get('getSubmittedPricesCustomer/'+localStorage.getItem('user_id')).subscribe((data)=> {
      this.spinner.hide()
      if(data.Error == false) {
        this.submitted = data.submitted
      }
    })
  }
  msprPremium(saw, price) {
    const d = 100* ((saw - price)/price);
    return String(d).substring(0,5);
  }
}