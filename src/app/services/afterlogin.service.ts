import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return !this.Token.loggedIn();
    const loggedIn = Boolean(localStorage.getItem('isAdmin'));
    if (loggedIn) {
      if (localStorage.getItem('isAdmin') == 'admin') {
        this.router.navigateByUrl('admin');
      } else {
        this.router.navigateByUrl('dashboard');
      }
      return false;
    } else {
      return true;
    }
  }
  constructor(private router: Router) { }
}
