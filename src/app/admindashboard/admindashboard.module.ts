import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { ProfileComponent } from './profile/profile.component';
import { SubmittedpricesComponent } from './submittedprices/submittedprices.component';
import { RequestedpricesComponent } from './requestedprices/requestedprices.component';
import { ManagemembersComponent } from './managemembers/managemembers.component';
import { ManageratingsComponent } from './manageratings/manageratings.component';
import { ManagestoresComponent } from './managestores/managestores.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { ManagepagecontentComponent } from './managepagecontent/managepagecontent.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { RequestedcollectionComponent } from './requestedcollection/requestedcollection.component';
import { HomepagedataComponent } from './homepagedata/homepagedata.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ModelandcategoryComponent } from './modelandcategory/modelandcategory.component';
import { MembersComponent } from './members/members.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FooterContentComponent } from './footer-content/footer-content.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsletterComponent } from './newsletter/newsletter.component';
import {ExcelService} from './../services/excel.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactRequestsComponent } from './contact-requests/contact-requests.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [HomeComponent, ProfileComponent, SubmittedpricesComponent, RequestedpricesComponent, ManagemembersComponent, ManageratingsComponent, ManagestoresComponent, ManageproductsComponent, ManagepagecontentComponent, RequestedcollectionComponent, HomepagedataComponent, ModelandcategoryComponent, MembersComponent, FaqsComponent, FooterContentComponent, NewsletterComponent, ContactRequestsComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    ChartsModule,
    DataTablesModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    UiSwitchModule,
    AngularEditorModule,
    NgbDatepickerModule,
    Ng2TelInputModule,
    NgxPaginationModule

  ],
  providers: [ExcelService]

})
export class AdmindashboardModule { }
