import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var jQuery:any;

@Component({
  selector: 'app-myratings',
  templateUrl: './myratings.component.html',
  styleUrls: ['./myratings.component.css']
})
export class MyratingsComponent implements OnInit {
  ratings: any;
  dtOptions = {}
  reviewForm: FormGroup;
  appearanceRate = 5;
  uniquenessRate = 5;
  prestigeRate = 5;
  valueRate = 5;
  product_id: any;
  productName: any;
  index: any;
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      overall: new FormControl('', [Validators.required]),
      appearance: new FormControl('', [Validators.required]),
      prestige: new FormControl('', [Validators.required]),
      uniueness: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
    this.dtOptions = {
      order : [6, 'desc'],
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_"
     },
    };
    this.getmyCollections();
  }
  getmyCollections() {
    this.spinner.show();
    const params = {
      id: localStorage.getItem('user_id')
    }
    this.ratings = null;
    this.api.post('myRatings', params).subscribe((data) => {
      this.spinner.hide();
      if (!data.Error) {
        this.ratings = data.ratings;
      }
    })
  }
  editRatingModal(ev,index) {
    this.appearanceRate = (Number(ev.appearance)*5)/100
    this.prestigeRate = (Number(ev.prestige)*5)/100
    this.uniquenessRate = (Number(ev.uniueness)*5)/100
    this.valueRate = (Number(ev.value)*5)/100
    this.product_id = ev.id
    this.productName = ev.product.name
    this.index = index
    jQuery("#myModal").modal("show");
  }
  addRatings() {
    const params = {
      appearance: this.appearanceRate,
      prestige: this.prestigeRate,
      uniqueness: this.uniquenessRate,
      value: this.valueRate,
      user_id: localStorage.getItem('user_id'),
      rating_id: this.product_id
    }
    this.spinner.show();
    this.api.post('updateReview', params).subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.getmyCollections();
        this.toast.success('Review Updated Successfully');  
        jQuery("#myModal").modal("hide");

      }
    })

  }
}
