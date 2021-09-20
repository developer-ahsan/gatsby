import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.css']
})
export class FooterContentComponent implements OnInit {
  footer: any;
  addFooter: FormGroup;
  footerId: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialize()
    this.getFooter()
  }
  initialize() {
    this.addFooter = new FormGroup({
      content: new FormControl('', [Validators.required]),
      copyright: new FormControl('', [Validators.required]),
      facebook: new FormControl('', [Validators.required]),
      instagram: new FormControl('', [Validators.required]),
    });
  }
  addFaqsSubmit() {
    this.spinner.show();
    this.api.post('addFooter', this.addFooter.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#footer").modal("hide");
        this.addFooter.reset();
        this.toast.success('Added Successfully');
        this.getFooter();
      }
    })
  }
  getFooter() {
    this.spinner.show();
    this.api.get('getFooter').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.footer = data.footer;
      }
    })
  }
  delFooter(id) {
    this.spinner.show();
    this.api.get('delFooter/'+id).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.getFooter()
      }
    })
  }
  updateFooterModal(footId,index) {
    this.footerId = footId;
    this.addFooter.patchValue({
      content: this.footer[index].content,
      copyright: this.footer[index].copyright,
      facebook: this.footer[index].facebook,
      instagram: this.footer[index].instagram
    })
    jQuery("#updateFooter").modal("show");
  }
  updateFooterSubmit() {
    this.spinner.show();
    this.api.post('updateFooter/'+this.footerId, this.addFooter.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#updateFooter").modal("hide");
        this.addFooter.reset();
        this.toast.success('Updated Successfully');
        this.getFooter();
      }
    })
  }
}
