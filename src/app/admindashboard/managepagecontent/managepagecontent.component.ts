import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

declare var jQuery:any;

@Component({
  selector: 'app-managepagecontent',
  templateUrl: './managepagecontent.component.html',
  styleUrls: ['./managepagecontent.component.css']
})
export class ManagepagecontentComponent implements OnInit {

  addAboutOne: FormGroup;
  addAboutTwo: FormGroup;
  addAboutThree: FormGroup;
  formData = new FormData;
  aboutOne: any;
  aboutTwo: any;
  aboutThree: any;
  aboutOneId: any;
  aboutTwoId: any;
  aboutThreeId: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getAllAbout();
  }
  initialize() {
    this.addAboutOne = new FormGroup({
      image1: new FormControl(''),
      image2: new FormControl(''),
      heading: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    this.addAboutTwo = new FormGroup({
      image1: new FormControl(''),
      heading: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    this.addAboutThree = new FormGroup({
      image1: new FormControl(''),
      heading: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }
  getAllAbout() {
    this.spinner.show();
    this.api.get('getAbout').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.aboutOne = data.data.about1;
        this.aboutThree = data.data.about3;
        this.aboutTwo = data.data.about2;
      }
    });
  }
  delAboutOne(id) {
    this.spinner.show();
    this.api.get('delAboutOne/'+id).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.getAllAbout();
      }
    })
  }
  delAboutTwo(id) {
    this.spinner.show();
    this.api.get('delAboutTwo/'+id).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.getAllAbout();
      }
    })
  }
  delAboutThree(id) {
    this.spinner.show();
    this.api.get('delAboutThree/'+id).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.getAllAbout();
      }
    })
  }
  onFileChange(event, value) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          this.formData.append('image'+value, event.target.files[0]);
      };
    }
  }
  addAboutOneSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutOne.controls).forEach(key => {
      let val = this.addAboutOne.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addAboutOne', this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutOne.reset();
      jQuery("#addAboutOne").modal("hide");
      if(!data.Error) {
        this.toast.success('About added Successfully');
        this.getAllAbout();
      }
    });
  }
  addAboutTwoSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutTwo.controls).forEach(key => {
      let val = this.addAboutTwo.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addAboutTwo', this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutTwo.reset();
      jQuery("#addAboutTwo").modal("hide");
      if(!data.Error) {
        this.toast.success('About added Successfully');
        this.getAllAbout();
      }
    });
  }
  addAboutThreeSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutThree.controls).forEach(key => {
      let val = this.addAboutThree.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addAboutThree', this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutThree.reset();
      jQuery("#addAboutThree").modal("hide");
      if(!data.Error) {
        this.toast.success('About added Successfully');
        this.getAllAbout();
      }
    });
  }

  updateAboutOne(about1Id, j) {
    this.aboutOneId = about1Id;
    this.addAboutOne.patchValue({
      heading: this.aboutOne[j].heading,
      content: this.aboutOne[j].content
    })
    jQuery("#updateAboutOne").modal("show");
  }
  updateAboutOneSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutOne.controls).forEach(key => {
      let val = this.addAboutOne.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateAboutOne/'+this.aboutOneId, this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutOne.reset();
      jQuery("#updateAboutOne").modal("hide");
      if(!data.Error) {
        this.toast.success('Updated Successfully');
        this.getAllAbout();
      }
    });
  }
  updateAboutTwo(about1Id, j) {
    this.aboutTwoId = about1Id;
    this.addAboutTwo.patchValue({
      heading: this.aboutTwo[j].heading,
      content: this.aboutTwo[j].content
    })
    jQuery("#updateAboutTwo").modal("show");
  }
  updateAboutTwoSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutTwo.controls).forEach(key => {
      let val = this.addAboutTwo.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateAboutTwo/'+this.aboutTwoId, this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutTwo.reset();
      jQuery("#updateAboutTwo").modal("hide");
      if(!data.Error) {
        this.toast.success('Updated Successfully');
        this.getAllAbout();
      }
    });
  }
  updateAboutThree(about1Id, j) {
    this.aboutThreeId = about1Id;
    this.addAboutThree.patchValue({
      heading: this.aboutThree[j].heading,
      content: this.aboutThree[j].content
    })
    jQuery("#updateAboutThree").modal("show");
  }
  updateAboutThreeSubmit() {
    this.spinner.show();
    Object.keys(this.addAboutThree.controls).forEach(key => {
      let val = this.addAboutThree.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateAboutThree/'+this.aboutThreeId, this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addAboutThree.reset();
      jQuery("#updateAboutThree").modal("hide");
      if(!data.Error) {
        this.toast.success('Updated Successfully');
        this.getAllAbout();
      }
    });
  }
}
