import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
declare var jQuery:any;

@Component({
  selector: 'app-webheader',
  templateUrl: './webheader.component.html',
  styleUrls: ['./webheader.component.css']
})
export class WebheaderComponent implements OnInit {
  searchSelect = 'name';
  banners: any;
  sell: any;
  productName: '';
  testimonial: any;
  range = []
  @ViewChild('placessRef', {static: true}) placesRef: GooglePlaceDirective;
  @ViewChild('navbarToggler') navbarToggler:ElementRef;
  sellCollectionForm: FormGroup;
  products: any;
  // searchProducts: any = [];
  ngSearch = '';
  category: any;
  brand: any;
  searchValue: any = '';
  mobileSearch = 0;
  // ngSearch = '';
  
  loginForm: FormGroup;
  resetForm: FormGroup;
  registerForm: FormGroup;
  checkLogin = Boolean(localStorage.getItem('isAdmin'));
  categories: any;
  searchProducts: any = [];
  allProducts: any;
  constructor(
    public api: ApiService,
    public Auth: AuthService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    
    
  ) {
   }

  ngOnInit(): void {
    this.getProducts();
    this.getHome();
    this.initialize();
    
    this.getCategory();
    this.getBrand();
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
  getProducts() {
    this.api.get('homeProduct').subscribe((data) => {
      this.products = data.products;
      this.allProducts = data.allPro;
    })
  }
  getCategory() {
    this.spinner.show();
    this.api.get('getCategory').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.category = data.category;
      }
    })
  }
  getBrand() {
    this.api.get('getModel').subscribe((data) => {
      if(data.success) {
        this.brand = data.brand;
      }
    })
  }
  getHome() {
    this.spinner.show();
    this.api.get('getWebsiteHome').subscribe((data) => {{
      this.spinner.hide();
      this.banners = data.data.main;
      this.sell = data.data.sell;
      this.testimonial = data.data.testimonial;
    }})
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
      this.searchValue = term;
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
    this.productName = name;
    this.ngSearch = ''
    this.mobileSearch = 0;
  }
  selectEvent(event) {
    console.log(event)
    if(this.searchSelect == 'name') {
      this.ngSearch = event.name;
    } else if(this.searchSelect == 'ref') {
      this.ngSearch = event.ref
    } else {
      this.ngSearch = event.upc
    }
 }
 searchProduct() {
  if(this.ngSearch == '') {
    this.toastr.warning('Please enter search term');
  } else {
    console.log('here');
    this.router.navigateByUrl('/searchproduct/'+this.ngSearch)
  }
}
setSearchValue(value) {
  this.ngSearch = value;
  this.searchValue = '';
}
filterProduct(event) {
  this.ngSearch == event.target.value;
  this.searchValue = event.target.value;
  this.searchProducts = this.allProducts.filter(task =>
    task.name.toLowerCase().includes(event.target.value) ||
    task.category.toLowerCase().includes(event.target.value) ||
    task.brand.toLowerCase().includes(event.target.value));
}
initialize() {
  this.sellCollectionForm = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl('', [Validators.required]),
    year: new FormControl(''),
    upc: new FormControl(''),
    value: new FormControl(''),
    location: new FormControl(''),
    detail: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
  });
}
}
