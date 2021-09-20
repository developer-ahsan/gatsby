import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { WebfooterComponent } from './website/common/webfooter/webfooter.component';
import { WebheaderComponent } from './website/common/webheader/webheader.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateformatPipe } from './pipes/dateformat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    WebsiteComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    WebheaderComponent,
    WebfooterComponent,
    AdmindashboardComponent,
    DateformatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    NgbModule,
  ],
  providers: [
    NgxSpinnerService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
