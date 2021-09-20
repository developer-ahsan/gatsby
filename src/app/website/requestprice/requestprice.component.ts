import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-requestprice',
  templateUrl: './requestprice.component.html',
  styleUrls: ['./requestprice.component.css']
})
export class RequestpriceComponent implements OnInit {
  fullText = false;
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;
  formData = new FormData;
  category: any;
  brand: any;
  ngSearch = '';
  product: any;
  addPriceForm: FormGroup;
  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  text = ""
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }
  initialize() {

    this.addPriceForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      message: new FormControl(''),
      price_you_saw: new FormControl(''),
      ref_upc: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      full_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.initialize();
    this.getCategory();
    // this.getBrand();
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
  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    const location = String(address.formatted_address).split(',');
      this.addPriceForm.patchValue({
        location: address.formatted_address,
      });
  }
  onFileChange(event, value) {
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
  addPriceRequest() {
    this.addPriceForm.patchValue({
      price_you_saw: parseFloat(this.addPriceForm.get('price_you_saw').value.replace(/,/g, ''))
    })
    this.spinner.show();
    Object.keys(this.addPriceForm.controls).forEach(key => {
      let val = this.addPriceForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('requestPrice', this.formData).subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.formData = new FormData;
        this.addPriceForm.reset();
        this.toast.success('Prices Submitted Successfully, We`ll send an email when it is available');
      }
    })
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
  numberFormat(value,name){
    value = value.replace(/,/g, '')
    // value = value.split('.')[0]      
    this.addPriceForm.get(name).setValue(value)
  }
  thousandFormator(value,name){
    let afterPointValue = value.split('.')[1]
    let msrpVal = this.api.numberFormat(parseInt(value), 0, '.',',')
    if(afterPointValue !== undefined){
      msrpVal = msrpVal.split('.')[0] + '.' + afterPointValue.slice(0, 2);
    }else{
      msrpVal = msrpVal.split('.')[0] + '.' + '00';
    }
    this.addPriceForm.patchValue({
      price_you_saw: msrpVal
    })
  }
  showFullText() {
    if(this.fullText) {
      this.fullText = false 
    } else {
      this.fullText = true
    }
  }
}
