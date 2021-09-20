import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
// update

@Component({
  selector: 'app-requestedcollection',
  templateUrl: './requestedcollection.component.html',
  styleUrls: ['./requestedcollection.component.css']
})
export class RequestedcollectionComponent implements OnInit {
  ratings: any;
  colId: any;
  ngPrice = '';
  dtOptions = {};
  // update
    itemID: any;
    arrayIndex: any;
    masterSelected:boolean;
    checklist:any;
    checkedList:any=[];
    checkedListDelete:any=[];
  tempTable: any;
    // update

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    // update
    private excelService:ExcelService
    // update
  ) { }

  ngOnInit(): void {
    // update
    this.masterSelected = false;
// update
this.dtOptions = {
  order: [1, 'desc'],
  processing: true,
  dom: 'lBfrtip',
  language: {
    "lengthMenu": "_MENU_"
 },
  buttons: [
    {
      extend: 'excel',
      text: 'Excel',
      exportOptions: {
          columns: ':not(.notexport)'
      }
    }
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
              id: data[index][2]
            }
            this.checkedList[index] = val
          }
          if(count > 0) {
            this.delSelectedItem()
          }
          
      }
    }

  ],
  // select: true,
  columnDefs: [ {
    orderable: false,
    className: 'select-checkbox',
    targets:   0
  },
],
select: {
    style:    'multi',
    selector: 'td:first-child'
},
  scrollX: true,
};  
    this.getRatings();
  }
  getRatings() {
    this.ratings = null
    this.spinner.show();
    this.api.get('getRequestedCollections').subscribe((data)=> {
      this.spinner.hide()
      if(!data.Error) {
        // update      
        this.ratings = data.collection.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
        console.log(this.ratings)
// update
      }
    })
  }
  sendClose(id)
  {
    this.spinner.show();
    const params = {
      id:id,
      status: 'close'
    }
    this.api.post('collectionmail', params).subscribe((data)=> {
      this.spinner.hide()
      if(data.success) {
        this.getRatings();
      }
    })
  }
  openModal(id) {
    this.colId = id;
    jQuery("#priceModel").modal("show");
  }
  sendPrice() {
    this.spinner.show();
    const params = {
      id:this.colId,
      status: 'active',
      price: this.ngPrice
    }
    this.api.post('collectionmail', params).subscribe((data)=> {
      this.spinner.hide()
      if(data.success) {
        this.getRatings();
    jQuery("#priceModel").modal("hide");

      }
    })
  }
  // update
  delItem(id, index) {
    this.itemID = id;
    console.log(index)
    this.arrayIndex = index;
    jQuery("#delItem").modal("show");
}
  deleteItem() {
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleRequestedCollections/';
    }else{
      requestData = this.itemID;
      key = 'delRequestedCollections/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delItem").modal("hide");
        if(key == 'delMultipleRequestedCollections/') {
          this.checkedListDelete = [];
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedList = []
        } else {
          this.ratings.splice(this.arrayIndex, 1);
        }
        
        // this.getRatings();
      }
    })
  }
  
  delSelectedItem(){
    this.checkedListDelete = this.checkedList.map(a => a.id);
    jQuery("#delItem").modal("show");

  }
// update
}
