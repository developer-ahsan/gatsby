import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managemembers',
  templateUrl: './managemembers.component.html',
  styleUrls: ['./managemembers.component.css']
})
export class ManagemembersComponent implements OnInit {
  dtOptions: any = {};

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      order: [2, 'desc'],
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_"
     },
        buttons: [
          'copy', 'csv', 'excel', 'print',

        ],
      select: true,

    };
  }

}
