import { ApiService } from './../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
@Component({
  selector: 'app-homepagedata',
  templateUrl: './homepagedata.component.html',
  styleUrls: ['./homepagedata.component.css']
})
export class HomepagedataComponent implements OnInit {
  addMainBanner: FormGroup;
  addSellBanner: FormGroup;
  addTestimonial: FormGroup;
  formData = new FormData;
  mainBanner: any;
  sellBanner: any;
  testimonialsList: any;
  idMainBanner: any;
  idsellBanner: any;
  idTestimonial: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getMainBanner();
    this.getSellBanner();
    this.getTestimonials();
    window.scroll(0,0);
  }
  initialize() {
    this.addMainBanner = new FormGroup({
      image: new FormControl('', [Validators.required]),
    });
    this.addSellBanner = new FormGroup({
      image: new FormControl('', [Validators.required]),
    });
    this.addTestimonial = new FormGroup({
      text: new FormControl('', [Validators.required]),
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
  getMainBanner() {
    this.spinner.show();
    this.api.get('getAdminMainBanner').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.mainBanner = data.banner;
      }
    })
  }
  getSellBanner() {
    this.api.get('getAdminSellNowBanner').subscribe((data) => {
      if(data.success) {
        this.sellBanner = data.banner;
      }
    })
  }
  getTestimonials() {
    this.api.get('getAdminTestimonial').subscribe((data) => {
      if(data.success) {
        this.testimonialsList = data.testimonial;
      }
    })
  }
  addMainBannerSubmit() {
    this.spinner.show();
    this.api.post('addMainBanner', this.formData).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#homeBanner").modal("hide");
        this.addMainBanner.reset();
        this.toast.success('Banner Added Successfully');
        this.formData = new FormData;
        this.getMainBanner();
      }
    })
  }
  addSellBannerSubmit() {
    this.spinner.show();
    this.api.post('addSellNowBanner', this.formData).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#sellnow").modal("hide");
        this.addSellBanner.reset();
        this.toast.success('Banner Added Successfully');
        this.formData = new FormData;
        this.getSellBanner();
      }
    })
  }
  addTestimonialSubmit() {
    this.spinner.show();
    this.api.post('addTestimonial', this.addTestimonial.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#testimonial").modal("hide");
        this.addTestimonial.reset();
        this.toast.success('Added Successfully');
        this.formData = new FormData;
        this.getTestimonials();
      }
    })
  }
  delMainBanner(id) {
    this.idMainBanner = id;
    jQuery("#delmainbanner").modal("show");
  }
  deleteMainBanner() {
    this.spinner.show();
    this.api.get('deleteAdminMainBanner/'+this.idMainBanner).subscribe((data) => {
      this.spinner.hide();
      this.getMainBanner();
      jQuery("#delmainbanner").modal("hide");
    })
  }
  delSellBanner(id) {
    this.idsellBanner = id;
    jQuery("#delsellbanner").modal("show");
  }
  deleteSellBanner() {
    this.spinner.show();
    this.api.get('deleteAdminSellNowBanner/'+this.idsellBanner).subscribe((data) => {
      this.spinner.hide();
      this.getSellBanner();
      jQuery("#delsellbanner").modal("hide");
    })
  }
  delTestimonial(id) {
    this.idTestimonial = id;
    jQuery("#deltestimonial").modal("show");
  }
  deleTetestimonial() {
    this.spinner.show();
    this.api.get('deleteAdminTestimonial/'+this.idTestimonial).subscribe((data) => {
      this.spinner.hide();
      this.getTestimonials();
      jQuery("#deltestimonial").modal("hide");
    })
  }
  updateStatusMain(event, id) {
    this.spinner.show();
    this.api.get('updateAdminMainBanner/'+id).subscribe((data) => {
      this.spinner.hide();
    })
  } 
  updateStatusSell(event, id) {
    this.spinner.show();
    this.api.get('updateAdminSellNowBanner/'+id).subscribe((data) => {
      this.spinner.hide();
    })
  } 
  updateStatusTestimonial(event, id) {
    this.spinner.show();
    this.api.get('updateAdminTestimonial/'+id).subscribe((data) => {
      this.spinner.hide();
    })
  } 
  updateTestimonial(testimonial, index) {
    this.idTestimonial = testimonial;
    this.addTestimonial.patchValue({
      text: this.testimonialsList[index].text
    })
    jQuery("#updateTestimonial").modal("show");
  }
  updateTestimonialSubmit() {
    this.spinner.show();
    this.api.post('updateTestimonial/'+this.idTestimonial, this.addTestimonial.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#updateTestimonial").modal("hide");
        this.addTestimonial.reset();
        this.toast.success('Updated Successfully');
        this.formData = new FormData;
        this.getTestimonials();
      }
    })
  }
}
