import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.css']
})
export class ClienthomeComponent implements OnInit {
  collection: any;
  collections: any;
  collectionSum: any;
  submissions:any;
  ratings: any;
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCounters();
  }
  getCounters() {
    this.spinner.show();
    this.api.get('getClientHome/'+localStorage.getItem('user_id')).subscribe((data) => {
      this.spinner.hide();
      if (!data.Error) {
        this.collection = data.data.collection;
        this.collections = data.data.collections;
        this.collectionSum = data.data.collectionSum;
        this.submissions = data.data.prices;
        this.ratings = data.data.ratings;
      }
    })
  }
}
