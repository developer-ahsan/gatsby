import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  privacy: any;

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getAllAbout()
  }
  getAllAbout() {
    this.spinner.show();
    this.api.get('getPrivacy').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.privacy = data.success;
      }
    });
  }

}
