import { NewsletterComponent } from './newsletter/newsletter.component';
import { FooterContentComponent } from './footer-content/footer-content.component';

import { MembersComponent } from './members/members.component';
import { ModelandcategoryComponent } from './modelandcategory/modelandcategory.component';
import { HomepagedataComponent } from './homepagedata/homepagedata.component';
import { RequestedcollectionComponent } from './requestedcollection/requestedcollection.component';
import { ManagestoresComponent } from './managestores/managestores.component';
import { ManageratingsComponent } from './manageratings/manageratings.component';
import { ManagemembersComponent } from './managemembers/managemembers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestedpricesComponent } from './requestedprices/requestedprices.component';
import { SubmittedpricesComponent } from './submittedprices/submittedprices.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { ManagepagecontentComponent } from './managepagecontent/managepagecontent.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactRequestsComponent } from './contact-requests/contact-requests.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'submittedprices',
        component: SubmittedpricesComponent,
      },
      {
        path: 'requestedprices',
        component: RequestedpricesComponent,
      },
      {
        path: 'managemebers',
        component: ManagemembersComponent,
      },
      {
        path: 'manageratings',
        component: ManageratingsComponent,
      },
      {
        path: 'managestores',
        component: ManagestoresComponent,
      },
      {
        path: 'manageproducts',
        component: ManageproductsComponent,
      },
      {
        path: 'managepages',
        component: ManagepagecontentComponent,
      },
      {
        path: 'requestedcollection',
        component: RequestedcollectionComponent,
      },
      {
        path: 'homepageContent',
        component: HomepagedataComponent,
      },
      {
        path: 'brandAndcategory',
        component: ModelandcategoryComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: 'faqsContent',
        component: FaqsComponent,
      },
      {
        path: 'footerContent',
        component: FooterContentComponent,
      },
      {
        path: 'aboutContent',
        component: ManagepagecontentComponent,
      },
      {
        path: 'newsletter',
        component: NewsletterComponent,
      },
      {
        path: 'contacts-request',
        component: ContactRequestsComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
