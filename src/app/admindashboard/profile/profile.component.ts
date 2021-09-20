import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  profileForm: FormGroup;
  currentUserId = localStorage.getItem('user_id');
  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getProfile();
  }
  initialize() {
    this.profileForm = new FormGroup({
      f_name: new FormControl('', [Validators.required]),
      l_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }
  getProfile() {
    this.spinner.show();
    this.api.get('profile/'+this.currentUserId).subscribe((data) => {
      this.spinner.hide();
      if (data.user) {
        this.profileForm.patchValue({
          f_name: data.user.f_name,
          l_name: data.user.l_name,
          email: data.user.email
        });
        if(data.user.user_details != null) {
          this.profileForm.patchValue({
            phone: data.user.user_details.phone,
            address: data.user.user_details.address,
            username: data.user.user_details.username,
          })
        }
      }
    })
  }
  updateProfile() {
    localStorage.setItem('UserName', this.profileForm.get('f_name').value + ' ' +  this.profileForm.get('l_name').value);
    this.spinner.show();
    this.api.post('updateClientProfile/'+this.currentUserId, this.profileForm.value).subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.toast.success('Profile Updated Successfully');
      }
    })
  }
  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    const location = String(address.formatted_address).split(',');
      this.profileForm.patchValue({
        address: address.formatted_address,
      });
  }
}
