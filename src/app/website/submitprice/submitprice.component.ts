import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-submitprice',
  templateUrl: './submitprice.component.html',
  styleUrls: ['./submitprice.component.css']
})
export class SubmitpriceComponent implements OnInit {
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;
  formData = new FormData;
  category: any;
  brand: any;
  searchValue: any = '';
  searchProducts: any = [];
  ngSearch = '';
  product: any;
  productName: '';
  addPriceForm: FormGroup;
  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
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
      msrp: new FormControl(''),
      rating: new FormControl(''),
      store_name: new FormControl(''),
      store_address: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      id: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.initialize();
    this.getCategory();
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

  getProductName(name){
    this.productName = name;
  }
  searchProduct(name) {
    this.productName = name;    
    this.spinner.show();
    const params = {
      search: name
    }
    if(this.ngSearch == '') {
      this.spinner.hide();
      this.toast.warning('Please fill search field');
    } else {
      this.api.post('searchProduct', params).subscribe((data) => {
        console.log(data)
        this.spinner.hide();
        this.searchProducts = [];
        if (!data.Error) {
          this.product = data.product;
          this.addPriceForm.patchValue({
            category: this.product.categoryId,
            brand: this.product.brand,
            model: this.product.name,
            msrp: this.product.msrp,
            rating: Number(this.product.variation.substring(0,6))*100,
            id: this.product.id
          })
          this.ChangeValue(this.product.categoryId)
        } else {
          this.toast.warning(data.msg)
        }
      })
    }
  }
  searchProductBtn() {
    this.spinner.show();
    const params = {
      search: this.productName
    }
    if(this.productName == '' || this.productName == undefined) {
      this.spinner.hide();
      this.toast.warning('Please fill search field');
    } else {
      this.api.post('searchProduct', params).subscribe((data) => {
        this.spinner.hide();
        this.searchProducts = [];
        if (!data.Error) {
          this.product = data.product;
          this.addPriceForm.patchValue({
            category: this.product.categoryId,
            brand: this.product.brand,
            model: this.product.name,
            msrp: this.product.msrp,
            rating: Number(this.product.variation.substring(0,6))*100,
            id: this.product.id
          })
          this.ChangeValue(this.product.categoryId)
        } else {
          this.toast.warning(data.msg)
        }
      })
    }
  }
  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    const location = String(address.formatted_address).split(',');
      this.addPriceForm.patchValue({
        store_address: address.formatted_address,
        store_name: address.name
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
    this.spinner.show();
    this.addPriceForm.patchValue({
      price_you_saw: parseFloat(this.addPriceForm.get('price_you_saw').value.replace(/,/g, ''))
    })
    console.log(this.addPriceForm.value)
    this.formData.append('user_id', localStorage.getItem('user_id'));
    Object.keys(this.addPriceForm.controls).forEach(key => {
      let val = this.addPriceForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('submitPriceWebsiteByProductID', this.formData).subscribe((data) => {
      this.spinner.hide();
      if(data.Error == false) {
        this.formData = new FormData;
        const msrp = this.addPriceForm.get('msrp').value;
        const price = this.addPriceForm.get('price_you_saw').value;
        const a = (Number(price) - Number(msrp))/Number(msrp)
        let percentageValue = a*100;
        this.toast.success('Prices Submitted Successfully');
        if (price > msrp) {
          this.toast.error('Thanks for providing that price. It looks like it was '+percentageValue.toFixed(2)+'% premium from MSRP.')
        } else {
          this.toast.success('Thanks for providing that price. It looks like it was '+percentageValue.toFixed(2)+'% discount from MSRP.')
        }
        this.addPriceForm.reset();

      }
    })
  }
  ChangeValue(ev) {
    this.spinner.show();
      this.api.get('getModelById/' + ev).subscribe((data) => {
        this.spinner.hide();
        if(data.success) {
          this.brand = data.brand;
          setTimeout(() => {
            this.addPriceForm.patchValue({
              brand: this.product.brand,
            })
          }, 100);
          
        }
      })
  }
  getSearchProducts(term) {
    this.productName = term;
    if (term.length > 2) {
      this.searchValue = term;
      this.api.get('searchProduct/'+term).subscribe(data => {
        if(data.product) {
          this.searchProducts = data.product;
        } else {
        }
      })
    } else {
      this.searchProducts = []
    }

  }
  setSearchValue(value) {
    this.ngSearch = value;
    this.searchValue = '';
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
    console.log(msrpVal)
    this.addPriceForm.patchValue({
      price_you_saw: msrpVal
    })
  }
}
