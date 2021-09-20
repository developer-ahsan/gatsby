import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin = localStorage.getItem('isAdmin');
  constructor() { }

  ngOnInit(): void {
  // Toggle the side navigation
  // $('#sidebarToggle, #sidebarToggleTop').on('click', function(e) {
  //   $('body').toggleClass('sidebar-toggled');
  //   $('.sidebar').toggleClass('toggled');
  //   if ($('.sidebar').hasClass('toggled')) {
  //     $('.sidebar .collapse').collapse('hide');
  //   }
  // });
  // }
  if(window.innerWidth < 600) {
    if (!$('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
      $('.sidebar').toggleClass('toggled');
    }
    }
  }
  onclick() {
    if(window.innerWidth < 600) {
    
    if (!$('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
      $('.sidebar').toggleClass('toggled');
    }
  }
  }
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = "./assets/admin/js/sb-admin-2.min.js";
    document.body.appendChild(script); 
  }
}
