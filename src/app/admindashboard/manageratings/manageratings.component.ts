import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
declare var jQuery:any;
// update

@Component({
  selector: 'app-manageratings',
  templateUrl: './manageratings.component.html',
  styleUrls: ['./manageratings.component.css']
})
export class ManageratingsComponent implements OnInit {
  dtOptions = {}
  ratings: any;
  // update
  itemID: any;
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

  ngOnInit(): void {
    // update
    this.masterSelected = false;
// update
    this.dtOptions = {
      order: [4, 'desc'],
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
      }
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
    this.spinner.show();
    this.api.get('getRatings').subscribe((data)=> {
      this.spinner.hide()
      if(!data.Error) {
        // update      
        this.ratings = data.ratings.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
        console.log(this.ratings)
// update
      }
    })
  }
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
      key = 'delMultipleRatings/';
    }else{
      requestData = this.itemID;
      key = 'delRatings/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delItem").modal("hide");
        if(key == 'delRatings/') {
          this.ratings.splice(this.arrayIndex, 1);
        } else {
          this.checkedListDelete = [];
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedList = []
        }
      }
    })
  }
  checkUncheckAll() {
    for (var i = 0; i < this.ratings.length; i++) {
      this.ratings[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.ratings.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.ratings.length; i++) {
      if(this.ratings[i].isSelected)
      this.checkedList.push(this.ratings[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.ratings
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Product_Name : checkedItem[i].product.name,
        Added_By : checkedItem[i].users.f_name + ' ' +checkedItem[i].users.l_name,
        Overall_Score : checkedItem[i].overall,
        Appearance_Score : checkedItem[i].appearance,
        Prestige_Score : checkedItem[i].prestige,
        Uniqueness_Score : checkedItem[i].uniueness,
        Value_Score : checkedItem[i].value,
        Date : checkedItem[i].created_at
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
}
