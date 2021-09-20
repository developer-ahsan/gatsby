import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('topScrollAnchor') topScroll: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  scrollTop() {
    // window.scrollTo(0, 0);    
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });

  }
}
