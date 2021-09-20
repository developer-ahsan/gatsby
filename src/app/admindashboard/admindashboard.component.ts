import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  @ViewChild('topScrollAnchor') topScroll: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  scrollTop() {
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo(0, 0);
  }
}
