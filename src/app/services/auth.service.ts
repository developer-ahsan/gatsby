import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public setAuthUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('UserName', user.f_name + ' ' + user.l_name);
  }
  public setIsAdmin(user: any) {
    localStorage.setItem('isAdmin', user);
  }

  public logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user_id');
    localStorage.removeItem('UserName');
    localStorage.removeItem('currentUser');
  }
}
