import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  resetForm: FormGroup
  constructor(
    public api: ApiService,
    public Auth: AuthService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    public activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    this.resetForm = new FormGroup({
      id: new FormControl(''),
      new: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });
    let id = this.activeRoute.snapshot.params.id;
    this.resetForm.patchValue({
      id: id
    })
  }
  submitForm() {}


}
