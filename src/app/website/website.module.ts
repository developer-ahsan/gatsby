import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { WebsiteComponent } from './website.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpassComponent } from './auth/resetpass/resetpass.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { SubmitpriceComponent } from './submitprice/submitprice.component';
import { RequestpriceComponent } from './requestprice/requestprice.component';
import { ProductsComponent } from './products/products.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { NgbPopoverModule, NgbModule, NgbRatingModule,  NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: 'requestprice',
        component: RequestpriceComponent,
      },
      {
        path: 'submitprice',
        component: SubmitpriceComponent,
      },
      {
        path: 'products/:type/page/:page',
        component: ProductsComponent,
      },
      {
        path: 'products/:type/page/:page/price/:price',
        component: ProductsComponent,
      },
      {
        path: 'products/:type/page/:page/brand/:brand',
        component: ProductsComponent,
      },
      {
        path: 'productdetails/:category/:id',
        component: ProductdetailsComponent,
      },
      {
        path: 'contactus',
        component: ContactusComponent,
      },
      {
        path: 'searchproduct/:term',
        component: SearchpageComponent,
      },
      {
        path: 'reset-password/:term/:id',
        component: ResetpasswordComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, ResetpassComponent, SidebarComponent, AboutusComponent, FaqsComponent, SubmitpriceComponent, RequestpriceComponent, ProductsComponent, ContactusComponent, ProductdetailsComponent, SearchpageComponent, ResetpasswordComponent, PrivacyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    GooglePlaceModule,
    NgbPopoverModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbModule,
    NgxAutocompleteModule,
    NgxPaginationModule,
    Ng2TelInputModule,
    NgbDatepickerModule 
  ]
})
export class WebsiteModule { }
