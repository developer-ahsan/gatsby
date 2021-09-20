import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
declare var jQuery:any;

// update

@Component({
  selector: 'app-submittedprices',
  templateUrl: './submittedprices.component.html',
  styleUrls: ['./submittedprices.component.css']
})
export class SubmittedpricesComponent implements OnInit {
  showModal: boolean;
 
  imgUrl: any;
  submitted: any;
  dtOptions: any = {};
// update
  SubmittedID: any;
  arrayIndex: any;
  masterSelected:boolean;
  checklist:any;
  checkedList:any=[];
  checkedListDelete:any=[];
  tempTable: DataTables.Api;
  // update

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    // update
    private excelService:ExcelService
    // update
  ) { }
  show(img)
  {
    this.imgUrl = this.api.imageUrl + img
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
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
        ,'selectAll','selectNone', 
        {
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
    this.getSubmittedPrices('all');
  }
  getSubmittedPrices(term) {
    this.spinner.show();
    this.api.get('getSubmittedPrices/'+term).subscribe((data)=> {
      this.spinner.hide()
      if(!data.Error) {
// update      
        this.submitted = data.submitted.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
        console.log(this.submitted)
// update

      }
    })
  }
  msprPremium(saw, price) {
    const d = 100* ((saw - price)/price);
    return String(d).substring(0,5);
  }
// update
delSubmitted(id, index) {
  this.SubmittedID = id;
  console.log(this.SubmittedID)
  this.arrayIndex = index;
  jQuery("#delSubmitted").modal("show");
}
  deleteSubmitted() {
    //update
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleSubmittedPrice/';
    }else{
      requestData = this.SubmittedID;
      key = 'delSubmittedPrice/';
    }        
    console.log(key)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delSubmitted").modal("hide");
        if(key == 'delSubmittedPrice/') {
          this.submitted.splice(this.arrayIndex, 1);
        } else {
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedListDelete = [];
          this.checkedList = []
        }
        
      }
    })
  }
  checkUncheckAll() {
    for (var i = 0; i < this.submitted.length; i++) {
      this.submitted[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.submitted.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.submitted.length; i++) {
      if(this.submitted[i].isSelected)
      this.checkedList.push(this.submitted[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.submitted
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Date_Submitted : checkedItem[i].created_at,
        Submitted_by : checkedItem[i].user.f_name + ' ' +checkedItem[i].user.l_name,
        Product_name : checkedItem[i].model,
        Price_Submitted : checkedItem[i].price_you_saw,
        MSRP : checkedItem[i].msrp,
        MSRP_Price_Premium : this.msprPremium(checkedItem[i].price_you_saw,checkedItem[i].msrp)+'%',
        Store_Name : checkedItem[i].store_name,
        Store_Address : checkedItem[i].store_address
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
    jQuery("#delSubmitted").modal("show");

  }
// update

}
