import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
declare var jQuery:any;

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  public products: any;
  checkLogin = Boolean(localStorage.getItem('isAdmin'));
  reviewForm: FormGroup;
  quantityForm: FormGroup;
  submitPriceForm: FormGroup;
  formData = new FormData;
  productId: any;
  appearanceRate = 5;
  uniquenessRate = 5;
  prestigeRate = 5;
  valueRate = 5;
  prod_id: any;

  ngAddress = "";
  percentageValue = 0;
  showSubmitForm = true;

  checkdiscount='';
  constructor(
    public api: ApiService,
    public activeRoute: ActivatedRoute,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }
  initialize() {
    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      overall: new FormControl('', [Validators.required]),
      appearance: new FormControl('', [Validators.required]),
      prestige: new FormControl('', [Validators.required]),
      uniueness: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
    this.quantityForm = new FormGroup({
      quantity: new FormControl('1', [Validators.required]),
    })
    this.submitPriceForm = new FormGroup({
      price_you_saw: new FormControl('', [Validators.required]),
      store_name: new FormControl('', [Validators.required]),
      store_address: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      message: new FormControl(''),
      id: new FormControl(''),
      user_id: new FormControl(''),
    });
  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    this.initialize();
    this.activeRoute.params.subscribe(res => {
      this.getProducts(res.id);
    })
    
  }
  getProducts(id) {
    this.spinner.show();
    this.api.get('productdetail/'+id+'/'+localStorage.getItem('user_id')).subscribe((data) => {
      this.spinner.hide();
      this.products = data.product;
    })
  }
  addtoCollections(id) {
    if(this.checkLogin) {
      this.productId = id;
      jQuery("#myCollection").modal("show");
    } else {
    jQuery("#sign-in").modal("show");
    this.toast.warning('Login Required');
    }

  }
  addProductCollection() {
    if(this.quantityForm.get('quantity').value >= 1) {
    this.spinner.show();
    const params = {
      product: this.productId,
      quantity: this.quantityForm.get('quantity').value,
      user: localStorage.getItem('user_id')
    };
    this.api.post('addtoCollection', params).subscribe((data) => {
      this.spinner.hide();
      jQuery("#myCollection").modal("hide");
      this.quantityForm.reset();
      if(!data.Error) {
        this.products.submitCheck = true
        this.toast.success('Successfully Added.')
      } else {
        this.toast.warning('Product is already in your collection');
      }
    })
  } else {
    this.toast.warning('Product Quantity must be 1 or greater than 1');

  }
  }
  getSubmitProduct(id) {
    if(this.checkLogin) {
    this.productId = id;
    this.submitPriceForm.patchValue({
      id: this.productId,
      user_id: localStorage.getItem('user_id')
    })
    jQuery("#submitPrice").modal("show");
  } else {
    jQuery("#sign-in").modal("show");
    this.toast.warning('Login Required');
  }
  }
  addPriceRequest() {
    this.submitPriceForm.patchValue({
      price_you_saw: parseFloat(this.submitPriceForm.get('price_you_saw').value.replace(/,/g, ''))
    })
    Object.keys(this.submitPriceForm.controls).forEach(key => {
      let val = this.submitPriceForm.get(key).value;
      this.formData.append(key, val);
    });
    this.spinner.show();
    this.api.post('submitPriceWebsiteByProductID', this.formData).subscribe((data) => {
      this.toast.success('Price Submitted Successfully');
        this.formData = new FormData;
        this.spinner.hide();
      jQuery("#submitPrice").modal("hide");
      this.getBlurValue(this.submitPriceForm.get('price_you_saw').value)
    })
  }
  getBlurValue(ev) {
    jQuery("#showPercentage").modal("show");
    const msrp = Number(this.products.msrp);
    const a = (Number(ev) - Number(msrp))/Number(msrp)
    this.percentageValue = a*100;
    if(Number(ev) > Number(msrp)) {
      this.checkdiscount =  'premium'
    } else {
      this.checkdiscount =  'discount'
    }
    this.submitPriceForm.reset();

    console.log(this.percentageValue)

  }
  addRatings() {
    const params = {
      appearance: this.appearanceRate,
      prestige: this.prestigeRate,
      uniqueness: this.uniquenessRate,
      value: this.valueRate,
      user_id: localStorage.getItem('user_id'),
      product_id: this.products.id
    }
    this.spinner.show();
    // Object.keys(this.reviewForm.controls).forEach(key => {
    //   let val = this.reviewForm.get(key).value;
    //   this.formData.append(key, val);
    // });
    // this.formData.append('user_id', localStorage.getItem('user_id'));
    // this.formData.append('product_id', this.activeRoute.snapshot.params.id);
    this.api.post('addReview', params).subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.toast.success('Review Submitted Successfully');
        jQuery("#myModal").modal("hide");
        this.formData = new FormData;
        this.reviewForm.reset();
      }
    })

  }
  inputChange(r) {
    console.log(r.target.value)
    if(r.target.value == '') {
      this.ngAddress = ''
      this.submitPriceForm.patchValue({
        store_address: '',
        store_name: ''
      });
    }
    var pacContainerInitialized = false;
    if (!pacContainerInitialized) {
      $('.pac-container').css('z-index', '9999');
      pacContainerInitialized = true;
    }
  }
  public handleAddressChange(address: Address) {
    console.log(address);
    const location = String(address.formatted_address).split(',');
      this.submitPriceForm.patchValue({
        store_address: address.formatted_address,
        store_name: address.name
      });
      this.ngAddress = address.name
  }
  onFileChange(event) {
    this.formData = new FormData;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          this.formData.append('image', event.target.files[0]);
      };
    }
  }
  loginRequireToast() {
    this.toast.warning('Login Required');
  }
  numberFormat(value,name){
    value = value.replace(/,/g, '')
    // value = value.split('.')[0]      
    this.submitPriceForm.get(name).setValue(value)
  }
  thousandFormator(value,name){
    let afterPointValue = value.split('.')[1]
    let msrpVal = this.api.numberFormat(parseInt(value), 0, '.',',')
    if(afterPointValue !== undefined){
      msrpVal = msrpVal.split('.')[0] + '.' + afterPointValue.slice(0, 2);
    }else{
      msrpVal = msrpVal.split('.')[0] + '.' + '00';
    }
    this.submitPriceForm.patchValue({
      price_you_saw: msrpVal
    })
  }
}
