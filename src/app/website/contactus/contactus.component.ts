import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  initialize() {
    this.contactForm = new FormGroup({
      f_name: new FormControl(''),
      l_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('',[Validators.required])
    });
  }
  get f() { return this.contactForm.controls; }

  ngOnInit(): void {
    this.initialize();
  }
  contactforms() {
    this.submitted = true;
    this.spinner.show();
    this.api.post('contactus',this.contactForm.value).subscribe((res) => {
      this.spinner.hide();
      this.toast.success('Our Support Team will contact you within 24-hrs.')
      this.contactForm.reset();
    })
    
  }

}
