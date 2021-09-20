import { MyratingsComponent } from './myratings/myratings.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { AddpriceComponent } from './addprice/addprice.component';
import { MycollectionsComponent } from './mycollections/mycollections.component';
import { ProfileComponent } from './profile/profile.component';
import { ClienthomeComponent } from './clienthome/clienthome.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmittedpricesComponent } from '../admindashboard/submittedprices/submittedprices.component';
import { SubmittedPricesComponent } from './submitted-prices/submitted-prices.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ClienthomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'mycollections',
        component: MycollectionsComponent,
      },
      {
        path: 'addprice',
        component: AddpriceComponent,
      },
      {
        path: 'accountsettings',
        component: AccountsettingsComponent,
      },
      {
        path: 'myratings',
        component: MyratingsComponent,
      },
      {
        path: 'submitted-prices',
        component: SubmittedPricesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
