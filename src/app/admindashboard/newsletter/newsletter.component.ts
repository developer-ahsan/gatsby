import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { param } from 'jquery';
declare var jQuery:any;

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  dtOptions = {}
  news: any;
  tempTable: DataTables.Api;
  checkedList = [];
  checkedListDelete = [];
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {   
      order : [0, 'desc'],
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_"
     },
        buttons: [
          'excel',
          ,'selectAll','selectNone', {
            text: 'Delete Selected',
            className: 'del-button',
            action: (item) => {
              this.tempTable = $('#dataTable').DataTable()
                var count = this.tempTable.rows( { selected: true } ).count();

                var data = this.tempTable.rows( { selected: true } ).data();
                // console.log(data);
                for (let index = 0; index < count; index++) {
                  let val = {
                    id: data[index][1]
                  }
                  this.checkedList[index] = val
                }
                if(count > 0) {
                  this.delSelectedItem()
                }
                
            }
        }

        ],
        columnDefs: [ {
          orderable: false,
          className: 'select-checkbox',
          targets:   0
        }
      ],
      select: {
          style:    'multi',
          selector: 'td:first-child'
      },

    }
    this.getNews();   

  }
  getNews() {
    this.spinner.show();
    this.api.get('getNewsLetter').subscribe((data)=> {
      this.news = data.news;      
      this.spinner.hide()
      if(!data.Error) {
        this.news = data.news;
      }
    })
  }
  delSelectedItem(){
    this.checkedListDelete = this.checkedList.map(a => a.id);
    jQuery("#delCustomer").modal("show");

  }
  deleteCustomer() {
    //update
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    requestData = this.checkedListDelete;     
    this.spinner.show();
    const params = {
      value: requestData
    }
    this.api.get('delNewsLetter/'+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedListDelete = [];
          this.checkedList = []
        }
        jQuery("#delCustomer").modal("hide");
    })
  }
}
