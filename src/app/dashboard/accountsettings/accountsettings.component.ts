import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.css']
})
export class AccountsettingsComponent implements OnInit {

  profileForm: FormGroup;
  currentUserId = localStorage.getItem('user_id');
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    this.profileForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      c_password: new FormControl('', [Validators.required]),
    });
  }
  updatePPassword() {
    this.spinner.show();
    if(this.profileForm.get('password').value == this.profileForm.get('c_password').value) {
      this.api.post('updateClientPassword/'+this.currentUserId, this.profileForm.value).subscribe((data) => {
        this.spinner.hide();
        if(!data.Error) {
          this.toast.success('Password Updated Successfully');
        }
      })
    } else {
      this.spinner.hide();
      this.toast.warning('Passwords are not same');
    }
    
  }

}
