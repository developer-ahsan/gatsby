import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutOne: any;
  aboutTwo: any;
  aboutThree: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getAllAbout();
  }
  getAllAbout() {
    this.spinner.show();
    this.api.get('getAboutLatest').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.aboutOne = data.data.about1;
        this.aboutThree = data.data.about3;
        this.aboutTwo = data.data.about2;
      }
    });
  }
}
