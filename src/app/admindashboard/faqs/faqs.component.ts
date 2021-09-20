import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

declare var jQuery:any;

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqs: any;
  addFaqs: FormGroup;
  faqId: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialize()
    this.getFaqs()    
  }
  initialize() {
    this.addFaqs = new FormGroup({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
  }
  addFaqsSubmit() {
    this.spinner.show();
    this.api.post('addFaqs', this.addFaqs.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#faqs").modal("hide");
        this.addFaqs.reset();
        this.toast.success('Added Successfully');
        this.getFaqs();
      }
    })
  }
  getFaqs() {
    this.spinner.show();
    this.api.get('getFaqs').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.faqs = data.faqs;
      }
    })
  }
  delFaqs(id) {
    this.spinner.show();
    this.api.get('delFaqs/'+id).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.getFaqs()
      }
    })
  }

  editFaqsModal(faqId, index) {
    this.faqId = faqId;
    this.addFaqs.patchValue({
      question: this.faqs[index].ques,
      answer: this.faqs[index].answer
    })
    console.log(this.faqs[index]);
    jQuery("#updateFaqs").modal("show");
  }
  updateFaqsSubmit() {
    this.spinner.show();
    this.api.post('updateFaqs/'+this.faqId, this.addFaqs.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#updateFaqs").modal("hide");
        this.addFaqs.reset();
        this.toast.success('Updated Successfully');
        this.getFaqs();
      }
    })
  }
}
