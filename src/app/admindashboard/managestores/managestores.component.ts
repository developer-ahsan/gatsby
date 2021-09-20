import { ApiService } from './../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
declare var jQuery:any;
// update

@Component({
  selector: 'app-managestores',
  templateUrl: './managestores.component.html',
  styleUrls: ['./managestores.component.css']
})
export class ManagestoresComponent implements OnInit {
  showModal1: boolean;
  priceModalData: any;
  stores: any;
  store_name = ''
  dtOptions: any = {};
  // update
    itemID: any;
    arrayIndex: any;
    masterSelected:boolean;
    checklist:any;
    checkedList:any=[];
    checkedListDelete:any=[];
  tempTable: any;
  // update
  paginations: any = [];
  totalRec : number;
  page: number = 1;
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
    this.getStores();
  }
  getStores() {
    this.spinner.show();
    this.api.get('getStores').subscribe((data)=> {
      this.spinner.hide()
      if(!data.Error) {
        this.stores = data.stores;
        // update      
        this.stores = data.stores.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
        // update
      }
    })
  }
  // update
  delItem(id, index) {
    this.itemID = id;
    console.log(this.itemID)
    this.arrayIndex = index;
    jQuery("#delItem").modal("show");
}
  deleteItem() {
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleStores/';
    }else{
      requestData = this.itemID;
      key = 'delStores/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delItem").modal("hide");
        if(key=='delStores/') {
          this.stores.splice(this.arrayIndex, 1);
        } else {
          this.checkedListDelete = [];
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedList = []
        }
        // this.getStores();
      }
    })
  }
  checkUncheckAll() {
    for (var i = 0; i < this.stores.length; i++) {
      this.stores[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.stores.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.stores.length; i++) {
      if(this.stores[i].isSelected)
      this.checkedList.push(this.stores[i]);
    }
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.stores
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Date_Added : checkedItem[i].created_at,
        Store_Name : checkedItem[i].store_name,
        Store_Address : checkedItem[i].store_address,
      }
      exportedList.push(obj);      
    }
    console.log(exportedList)
    if(btnName == 'xlsxBtn'){
      this.excelService.exportAsExcelFile(exportedList, 'Gatsby');
    }else{
      CsvDataService.exportToCsv('Gatsby.csv', exportedList);
    }
  }
  delSelectedItem(){
    this.checkedListDelete = this.checkedList.map(a => a.id);
    jQuery("#delItem").modal("show");

  }
// update
  showModal(data)
  {
      this.store_name = data[0].store_name
      this.priceModalData = data;
      this.paginations = data;
      this.totalRec = data.length
      this.showModal1 = true; 
  }
  hideModal()
  {
    this.showModal1 = false;
  }
  msprPremium(saw, price) {
    const d = 100* ((saw - price)/price);
    return String(d).substring(0,5);
  }
}
