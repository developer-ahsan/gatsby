import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';


@Component({
  selector: 'app-webfooter',
  templateUrl: './webfooter.component.html',
  styleUrls: ['./webfooter.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class WebfooterComponent implements OnInit {
  subscriptionForm: FormGroup;
  footer: any;
  ngNews = '';
  submitted = false;
  closeResult: string;
  newsLetter: any = localStorage.getItem('newsLetter');
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService, 
    private formBuilder: FormBuilder   
  ) { }

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.getFooter();
    
  }
  get f() { return this.subscriptionForm.controls; }
  getFooter() {
    this.api.get('getFooterLatest').subscribe((data) => {
      if(data.success) {
        this.footer = data.footer;
      }
    })
  }
  addNewsLetter() {
    this.submitted = true;
    if (this.subscriptionForm.invalid) {
      return;
    }
    this.spinner.show();
    this.api.post('addnewsLetter', this.subscriptionForm.value).subscribe((data) => {
      this.spinner.hide();      
      this.toast.success(data.msg);
      Swal.fire("Subscribed!", "Thanks for subscribing The Gatsby Guide Newsletter!", "success");
    })
  }
}
