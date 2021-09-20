import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
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
    console.log(this.activeRoute.snapshot.params.term)
    if(this.activeRoute.snapshot.params.term != localStorage.getItem('ForgetMatch')) {
      this.toastr.warning('Reset Link expired')
      this.router.navigateByUrl('/')
    }
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
  submitForm() {
    console.log(this.resetForm.get('new').value)
    if(this.resetForm.get('new').value != this.resetForm.get('confirm').value) {
      this.toastr.warning('Passwords are not same');
    } else {
      this.spinner.show();
      this.api.post('resetPassword',this.resetForm.value).subscribe(res => {
        if(res.err == 0) {
          this.toastr.success(res.msg)
          this.router.navigateByUrl('/')
        } else {
          this.toastr.warning(res.msg)
        }
      })
  }
  }

}
