import { AfterLoginService } from './services/afterlogin.service';
import { BeforeLoginService } from './services/before-login.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(mod => mod.WebsiteModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [BeforeLoginService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admindashboard/admindashboard.module').then(mod => mod.AdmindashboardModule),
    canActivate: [BeforeLoginService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AfterLoginService]

  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
