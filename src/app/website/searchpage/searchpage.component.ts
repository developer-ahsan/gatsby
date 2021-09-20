import { ApiService } from './../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  products: any;
  term: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.term =this.activeRoute.snapshot.params.term;
    this.getProducts();
  }
  getProducts() {
    this.spinner.show();
    this.api.get('searchProduct/'+this.term).subscribe(data => {
      this.spinner.hide();
      if(data.product) {
        this.products = data.product;
      } else {
        this.toast.success('No Item Exist');
      }
    })
  }

}
