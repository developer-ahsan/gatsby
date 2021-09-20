import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ClienthomeComponent } from './clienthome/clienthome.component';
import { ProfileComponent } from './profile/profile.component';
import { MycollectionsComponent } from './mycollections/mycollections.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { AddpriceComponent } from './addprice/addprice.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { MyratingsComponent } from './myratings/myratings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SubmittedPricesComponent } from './submitted-prices/submitted-prices.component';
import { NgbPopoverModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  declarations: [ClienthomeComponent, ProfileComponent, MycollectionsComponent, AddpriceComponent, AccountsettingsComponent, MyratingsComponent, SubmittedPricesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    NgbRatingModule,
    NgbPopoverModule,
    Ng2TelInputModule,
  ]
})
export class DashboardModule { }
