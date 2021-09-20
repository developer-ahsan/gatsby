import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

declare var jQuery:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  searchSelect = 'name';
  categories: any;
  banners: any;
  sell: any;
  productName: '';
  testimonial: any;
  range = []
  @ViewChild('placessRef', {static: true}) placesRef: GooglePlaceDirective;

  sellCollectionForm: FormGroup;
  products: any;
  searchProducts: any = [];
  ngSearch = '';
  category: any;
  brand: any;
  searchValue: any = '';
  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  allProducts: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getHome();
    this.initialize();
    this.getProducts();
    this.getCategory();
    this.getBrand();    
    var year = new Date().getFullYear();
    this.range = [];
    this.range.push(year);
    for (var i = 1; i < 110; i++) {
        this.range.push(year - i);
    }
  }
  getProducts() {
    this.api.get('homeProduct').subscribe((data) => {
      this.products = data.products;
      this.allProducts = data.allPro;
    })
  }

  selectEvent(event) {
    console.log(event)
    if(this.searchSelect == 'name') {
      this.ngSearch = event.name;
    } else if(this.searchSelect == 'ref') {
      this.ngSearch = event.ref
    } else {
      this.ngSearch = event.upc
    }
 }
  getCategory() {
    this.spinner.show();
    this.api.get('getCategory').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.category = data.category;
      }
    })
  }
  getBrand() {
    this.api.get('getModel').subscribe((data) => {
      if(data.success) {
        this.brand = data.brand;
      }
    })
  }
  searchProduct() {
    if(this.ngSearch == '') {
      this.toast.warning('Please enter search term');
    } else {
      console.log('here');
      this.router.navigateByUrl('/searchproduct/'+this.ngSearch)
    }
  }
  initialize() {
    this.sellCollectionForm = new FormGroup({
      f_name: new FormControl('', [Validators.required]),
      l_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      category: new FormControl(''),
      brand: new FormControl(''),
      model: new FormControl('', [Validators.required]),
      year: new FormControl(''),
      upc: new FormControl(''),
      value: new FormControl(''),
      location: new FormControl(''),
      detail: new FormControl(''),
      quantity: new FormControl('', [Validators.required]),
    });
  }
  sellNow() {
    this.spinner.show();
    this.sellCollectionForm.patchValue({
      value: parseFloat(this.sellCollectionForm.get('value').value.replace(/,/g, ''))
    })
    this.api.post('addRequestedCollection', this.sellCollectionForm.value).subscribe((data) => {
      this.spinner.hide();
      this.sellCollectionForm.reset();
      jQuery("#sell-now").modal("hide");
      this.toast.success('Thanks for your request. Our Team will get back to you within the next business day!');
    })
  }
  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    const location = String(address.formatted_address).split(',');
      this.sellCollectionForm.patchValue({
        location: address.formatted_address,
      });
  }
  inputChange(r) {
    var pacContainerInitialized = false;
    if (!pacContainerInitialized) {
      $('.pac-container').css('z-index', '9999');
      pacContainerInitialized = true;
    }
  }
  getHome() {
    this.spinner.show();
    this.api.get('getWebsiteHome').subscribe((data) => {{
      this.spinner.hide();
      this.banners = data.data.main;
      this.sell = data.data.sell;
      this.testimonial = data.data.testimonial;
    }})
  }
  ChangeValue(ev) {
    this.spinner.show();
      this.api.get('getModelById/' + ev).subscribe((data) => {
        this.spinner.hide();
        if(data.success) {
          this.brand = data.brand;
        }
      })
  }
  getProductName(name){
    this.productName = name;
  }
  getSearchProducts(term) {
    if (term.length > 2) {
      this.searchValue = term;
      this.api.get('searchProduct/'+term).subscribe(data => {
        console.log(data)
        if(data.product) {
          this.searchProducts = data.product;
        } else {
        }
      })
    } else {
      this.searchProducts = []
    }

  }
  filterProduct(event) {
    this.ngSearch == event.target.value;
    this.searchValue = event.target.value;
    this.searchProducts = this.allProducts.filter(task =>
      task.name.toLowerCase().includes(event.target.value) ||
      task.category.toLowerCase().includes(event.target.value) ||
      task.brand.toLowerCase().includes(event.target.value));
  }
  setSearchValue(value) {
    this.ngSearch = value;
    this.searchValue = '';
  }
  numberFormat(value,name){
    value = value.replace(/,/g, '')
    // value = value.split('.')[0]      
    this.sellCollectionForm.get(name).setValue(value)
  }
  thousandFormator(value,name){
    let afterPointValue = value.split('.')[1]
    let msrpVal = this.api.numberFormat(parseInt(value), 0, '.',',')
    if(afterPointValue !== undefined){
      msrpVal = msrpVal.split('.')[0] + '.' + afterPointValue.slice(0, 2);
    }else{
      msrpVal = msrpVal.split('.')[0] + '.' + '00';
    }
    console.log(msrpVal);
    this.sellCollectionForm.patchValue({
      value: msrpVal
    })
  }
}
