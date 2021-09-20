import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = 'admin';
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;
  username = localStorage.getItem('UserName');
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
}
  logout() {
    window.location.reload();
    this.auth.logout();
  }
  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
