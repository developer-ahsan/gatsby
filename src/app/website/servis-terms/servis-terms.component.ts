import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-servis-terms',
  templateUrl: './servis-terms.component.html',
  styleUrls: ['./servis-terms.component.css']
})
export class ServisTermsComponent implements OnInit {
  privacy: any;

  constructor( public api: ApiService,
    public spinner: NgxSpinnerService,) { }

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
