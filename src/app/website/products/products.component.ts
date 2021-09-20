import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { param } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  type: any;
  products: any = [];
  config: any;
  ngFilter = 'filter';
  ngBrand = 'filter';
  brands: any;
  category: any;
  paginations: any = [];
  page = 1;
  pagePath: any;
  _products: any;
  filterPage = false;
  constructor(
    public api: ApiService,
    public activeRoute: ActivatedRoute,
    public toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.paginations = [];
      this._products = null;
      this.category = null;
      this.brands = null;
      if(!params['price'] && !params['brand']) {
        this.type = params['type'];
        this.page = Number(params['page']);
        if(this.page == 1) {
          this.getProducts(this.type);
        } else {
          this.pageChange();
        }
      } else if(params['price']){
        this.type = params['type'];
        this.page = Number(params['page']);
        this.ngFilter = params['price'];
        if(this.page == 1) {
          this.getFilterProducts();
        } else {
          this.getFilterPageChange();
        }
      } else if(params['brand']){
        this.type = params['type'];
        this.page = Number(params['page']);
        this.ngBrand = params['brand'];
        if(this.page == 1) {
          this.getBrandFilterProducts();
        } else {
          this.getBrandFilterPageChange();
        }
      }
    });
  }
  pageChange() {
    this.spinner.show()
    this.api.getProduct(localStorage.getItem('pagePath')+'?page='+this.page).subscribe((data) => {
      this.spinner.hide();
      this.products = data.products;
      this.brands = data.brands;
      this.category = data.categories;
      this._products = this.products.data
      this.pagePath = this.products.path;
      if(this.products.last_page > 1) {
        for (let index = 1; index <= this.products.last_page; index++) {
          this.paginations.push(index);
        }
      }
    })
  }
  getProducts(type) {
    this.spinner.show();
    this.paginations = [];
    this.api.get('getProductByCategory/'+type).subscribe((data) => {
      this.spinner.hide();
      this.products = data.products;
      this.brands = data.brands;
      this.category = data.categories;
      this.pagePath = this.products.path;
      this._products = this.products.data
      localStorage.setItem('pagePath',this.pagePath);
      if(this.products.last_page > 1) {
        for (let index = 1; index <= this.products.last_page; index++) {
          this.paginations.push(index);
        }
      }
    })
  }

  getFilterPageChange() {
    this.spinner.show()
    this.paginations = [];
    this.api.getProduct(localStorage.getItem('pricePagePath')+'?page='+this.page).subscribe((data) => {
      this.spinner.hide();
      this.products = data.products;
      this._products = this.products.data;
      this.brands = data.brands;
      this.category = data.categories;
      if(this.products.last_page > 1) {
        for (let index = 1; index <= this.products.last_page; index++) {
          this.paginations.push(index);
        }
      }
    })
  }
  
  filterProducts() {
    if(this.ngFilter != 'filter') {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+1+'/price/'+this.ngFilter);
    } else {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+1);
    }
  }
  getFilterProducts() {
    this.spinner.show();
    this.paginations = [];
      this.api.get('getProductByCategoryFilter/'+this.ngFilter+'/'+this.type).subscribe((res) => {
        this.spinner.hide();
        this._products = null
        this.products = res.products;
        this.pagePath = this.products.path;
        this.brands = res.brands;
        this.category = res.categories;
        localStorage.setItem('pricePagePath',this.pagePath);
        this._products = this.products.data;
        if(this.products.last_page > 1) {
          for (let index = 1; index <= this.products.last_page; index++) {
            this.paginations.push(index);
          }
        }
      })
  }
  priceFilter(filter) {
    if(filter == 'L_To_H') {
      this._products.sort((a,b) => {
        return Number(a.market_value) - Number(b.market_value)
      });
    } else {
      this._products.sort((a,b) => {
        return Number(b.market_value) - Number(a.market_value)
      });
    }
  }
  filterBrandProducts() {
    if(this.ngBrand != 'filter') {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+1+'/brand/'+this.ngBrand);
    } else {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+1);
    }
  }
  getBrandFilterProducts() {
    this.spinner.show();
    this.paginations = [];
      this.api.get('getProductByCategoryFilterBrand/'+this.ngBrand+'/'+this.type).subscribe((res) => {
        this.spinner.hide();
        this._products = null
        this.products = res.products;
        this.pagePath = this.products.path;
        this.brands = res.brands;
        this.category = res.categories;
        localStorage.setItem('brandPagePath',this.pagePath);
        this._products = this.products.data;
        if(this.products.last_page > 1) {
          for (let index = 1; index <= this.products.last_page; index++) {
            this.paginations.push(index);
          }
        }
      })
  }
  getBrandFilterPageChange() {
    this.spinner.show()
    this.paginations = [];
    this.api.getProduct(localStorage.getItem('brandPagePath')+'?page='+this.page).subscribe((data) => {
      this.spinner.hide();
      this.products = data.products;
      this._products = this.products.data;
      this.brands = data.brands;
      this.category = data.categories;
      if(this.products.last_page > 1) {
        for (let index = 1; index <= this.products.last_page; index++) {
          this.paginations.push(index);
        }
      }
    })
  }
  brandFilter(brand) {
    this._products = this._products.filter((res) => {
      console.log(res)
      return res.brand == brand
    })
  }
  changePage(page) {
    if(this.ngFilter == 'filter' && this.ngBrand == 'filter') {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+page);
    } else if(this.ngFilter != 'filter'){
      this.router.navigateByUrl('/products/'+this.type+'/page/'+page+'/price/'+this.ngFilter);
    } else if(this.ngBrand != 'filter') {
      this.router.navigateByUrl('/products/'+this.type+'/page/'+page+'/brand/'+this.ngBrand);
    }
  }
}
