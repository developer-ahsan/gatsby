import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
declare var jQuery:any;

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  addAboutOne: FormGroup;
  privacy: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllAbout();
    this.addAboutOne = new FormGroup({
      content: new FormControl('', [Validators.required])
    });
  }
  addAboutOneSubmit() {
    this.spinner.show();
    this.api.post('addPrivacy', this.addAboutOne.value).subscribe((data) => {
      this.spinner.hide();
      this.addAboutOne.reset();
      jQuery("#addAboutOne").modal("hide");
      if(data.success) {
        this.toast.success('Privacy added Successfully');
        this.getAllAbout();
      }
    });
  }
  getAllAbout() {
    this.spinner.show();
    this.api.get('getPrivacy').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.privacy = data.success;
      }
    });
  }
  updateAboutOne(about1Id) {
    this.addAboutOne.patchValue({
      content: this.privacy.content
    })
    jQuery("#updateAboutOne").modal("show");
  }
  updateAboutOneSubmit() {
    this.spinner.show();
    this.api.post('updatePrivacy/'+this.privacy.id, this.addAboutOne.value).subscribe((data) => {
      this.spinner.hide();
      this.addAboutOne.reset();
      jQuery("#updateAboutOne").modal("hide");
      if(data.success) {
        this.toast.success('Updated Successfully');
        this.getAllAbout();
      }
    });
  }

}
