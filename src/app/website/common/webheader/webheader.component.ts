import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var jQuery:any;

@Component({
  selector: 'app-webheader',
  templateUrl: './webheader.component.html',
  styleUrls: ['./webheader.component.css']
})
export class WebheaderComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler:ElementRef;
  mobileSearch = 0;
  ngSearch = '';
  
  loginForm: FormGroup;
  resetForm: FormGroup;
  registerForm: FormGroup;
  checkLogin = Boolean(localStorage.getItem('isAdmin'));
  categories: any;
  searchProducts: any = [];
  constructor(
    public api: ApiService,
    public Auth: AuthService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
  ) {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      value: new FormControl('')
    });
    this.registerForm = new FormGroup({
      f_name: new FormControl('', [Validators.required]),
      l_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      c_password: new FormControl('', [Validators.required])
    });
    this.getCategories();
  }
  get f() { return this.loginForm.controls; }
  passwordReset() {
    let v = Math.random().toString(36).substring(7);
    console.log(v)
    localStorage.setItem('ForgetMatch', v);
    this.resetForm.patchValue({
      value: v
    })
    this.spinner.show();
    jQuery("#sign-reset").modal("hide");
    this.api.post('forgetPassword', this.resetForm.value).subscribe((resp) => {
      this.spinner.hide();
      if (resp.Error == false) {
        this.resetForm.reset();
        this.toastr.success('Please check your Email')
      } else {
        this.resetForm.reset();
        this.toastr.error(resp.msg);
      }
    });
  }
  onSubmit() {
    this.spinner.show();
    if (this.loginForm.invalid) {
      this.spinner.hide();
      return false;
    }
    jQuery("#sign-in").modal("hide");
    this.api.post('login', this.loginForm.value).subscribe((resp) => {
      this.spinner.hide();
      if (resp.Error == false) {
        localStorage.setItem('user_id', resp.user.id);
        this.Auth.setAuthUser(resp.user);
        this.Auth.setIsAdmin(resp.user.user_type);
        this.toastr.success(resp.msg);
        this.loginForm.reset();
        this.checkLogin = Boolean(localStorage.getItem('isAdmin'));
        window.location.reload();
        // if(resp.user.user_type == 'admin') {
        //   this.router.navigateByUrl('/admin')
        // } else {
        //   this.router.navigateByUrl('/dashboard')
        // }
      } else {
        this.toastr.error(resp.msg);
      }
    });
  }
  onRegister() {
    this.spinner.show();
    if (this.registerForm.get('password').value != this.registerForm.get('c_password').value) {
      this.spinner.hide();
      this.toastr.warning('Passwords are not same');
      return false;
    }
    jQuery("#sign-up").modal("hide");
    this.api.post('register', this.registerForm.value).subscribe((resp) => {
      this.spinner.hide();
      if (resp.Error == false) {
        this.toastr.success(resp.msg);
        this.registerForm.reset();
      } else {
        this.toastr.error(resp.msg);
      }
    });
  }
  openmodel(d) {
    if(d=='up') {
      jQuery("#sign-in").modal("hide");
      jQuery("#sign-up").modal("show");
    } else if(d=='forget') {
      jQuery("#sign-up").modal("hide");
      jQuery("#sign-in").modal("hide");
      jQuery("#sign-reset").modal("show");
    } else {
      jQuery("#sign-up").modal("hide");
      jQuery("#sign-in").modal("show");
      jQuery("#sign-reset").modal("hide");
    }
  }
  openDashboard() {
    if (localStorage.getItem('isAdmin') == 'admin') {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  getCategories() {
    this.api.get('getCategories').subscribe((data) => {
      this.categories = data.categories;
    });
  }
  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
  logout() {
    window.location.reload();
    this.Auth.logout();
  }
  mobileSearcsh(key) {
    this.searchProducts = [];
    if(key == 'open') {
      if(this.mobileSearch == 0) {
        this.mobileSearch = 1;
      } else {
        this.mobileSearch = 0;
      }
    } else {
      this.mobileSearch = 0
      if(this.ngSearch != '') {
        this.router.navigateByUrl('/searchproduct/'+this.ngSearch)
        console.log(this.ngSearch)
        this.ngSearch = ''
      }
    }
    
  }
  getSearchProducts(term) {
    if (term.length > 2) {
      this.ngSearch = term;
      this.api.get('searchProduct/'+term).subscribe(data => {
        console.log(data)
        if(data.product) {
          this.searchProducts = data.product;
        } else {
        }
      })
    } else {
      this.searchProducts = []
    }
  }
  getProductName(name) {
    this.ngSearch = ''
    this.mobileSearch = 0;
  }
}
