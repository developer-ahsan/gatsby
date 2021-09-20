import { ApiService } from './../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faqs: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFaqs();
  }
  getFaqs() {
    this.spinner.show();
    this.api.get('getFaqs').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.faqs = data.faqs;
      }
    })
  }

}
