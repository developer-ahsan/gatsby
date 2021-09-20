import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;
  @ViewChild('topScrollAnchor') topScroll: ElementRef;

  sellCollectionForm: FormGroup; 
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  ngOnInit(): void {
    this.initialize();
  }
  scrollTop() {
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo(0, 0);
  }
  initialize() {
    this.sellCollectionForm = new FormGroup({
      f_name: new FormControl(''),
      l_name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl(''),
      upc: new FormControl('', [Validators.required]),
      value: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      quantity: new FormControl(''),
    });
  }
  sellNow() {
    this.spinner.show();
    this.api.post('sellnow', this.sellCollectionForm.value).subscribe((data) => {
      this.spinner.hide();
      this.toast.success('Your Request Submitted Successfully');
    })
  }
  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    const location = String(address.formatted_address).split(',');
      this.sellCollectionForm.patchValue({
        location: address.formatted_address,
      });
  }

}
