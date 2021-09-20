import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var jQuery:any;
// update

@Component({
  selector: 'app-requestedprices',
  templateUrl: './requestedprices.component.html',
  styleUrls: ['./requestedprices.component.css']
})
export class RequestedpricesComponent implements OnInit {
  dtOptions: any = {};
  addProductForm: FormGroup;
  formData = new FormData;

  requested: any;
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
    private toast: ToastrService,
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
      { width: 200, targets: 12 }
    ],
    select: {
        style:    'multi',
        selector: 'td:first-child'
    },
      scrollX: true,
    };
    this.addProductForm = new FormGroup({
      image: new FormControl(''),
      prod_id: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      msrp: new FormControl('', [Validators.required]),
      market_value: new FormControl('', [Validators.required]),
      upc: new FormControl(''),
      ref: new FormControl(''),
      size: new FormControl(''),
      year: new FormControl(''),
      other1: new FormControl(''),
      other2: new FormControl(''),
      other3: new FormControl(''),
      requestId: new FormControl('')
    });
    this.getRequestedPrices();
  }
  getRequestedPrices() {
    this.requested = null;
    this.spinner.show();
    this.api.get('getRequestedPrices').subscribe((data)=> {
      this.spinner.hide()
      if(!data.Error) {
        // update      
        this.requested = data.requested.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
        console.log(this.requested)
      // update
      }
    })
  }
  sendEmail(id) {
    this.spinner.show();
    this.api.get('sendRequestemail/'+id).subscribe((data)=> {
      this.spinner.hide()
      if (!data.Error) {
        this.toast.success('Email Sent Successfully')
        this.getRequestedPrices();
      }
    })
  }
  onFileChange(event, value) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          this.formData.append('photo', event.target.files[0]);
      };
    }
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
      key = 'deleteMultipleRequestedPrices/';
    }else{
      requestData = this.itemID;
      key = 'deleteRequestedPrices/';
    }        
    this.spinner.show();
    console.log(key)

    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delItem").modal("hide");
        if(key == 'deleteRequestedPrices/') {
          this.requested.splice(this.arrayIndex, 1); 
        } else {
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedListDelete = [];
          this.checkedList = []
        }
        
        // this.getRequestedPrices();
      }
    })
  }
  checkUncheckAll() {
    for (var i = 0; i < this.requested.length; i++) {
      this.requested[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.requested.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.requested.length; i++) {
      if(this.requested[i].isSelected)
      this.checkedList.push(this.requested[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.requested
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Date_Requested : checkedItem[i].created_at,
        Request_by : checkedItem[i].full_name,
        Image : checkedItem[i].image,
        Category : checkedItem[i].category,
        Brand : checkedItem[i].brand,
        Product_Requested : checkedItem[i].model,
        Price_You_Saw : checkedItem[i].price_you_saw,
        Reference : checkedItem[i].ref_upc,
        Email : checkedItem[i].email,
        Location : checkedItem[i].location
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
getProductById(item) {
    this.addProductForm.patchValue({
      requestId: item.id,
      prod_id: '',
      image: item.image,
      category: item.category,
      brand: item.brand,
      name: item.model,
      msrp: '',
      market_value: item.price_you_saw,
      upc: item.ref_upc,
      ref: item.ref_upc,
      size: '',
      year: '',
      other1: '',
      other2: '',
      other3: ''
    });
    jQuery("#updateProduct").modal("show");
}
updateProduct() {
  this.spinner.show();
  Object.keys(this.addProductForm.controls).forEach(key => {
    let val = this.addProductForm.get(key).value;
    this.formData.append(key, val);
  });
    this.api.post('sendRequestemail', this.formData).subscribe((data)=> {
      this.spinner.hide()
      if (!data.Error) {
        this.toast.success('Email Sent Successfully')
        jQuery("#updateProduct").modal("hide");
        this.getRequestedPrices();
      }
    })
  // this.api.post('addProduct', this.formData).subscribe(data => {
  //   this.spinner.hide();
  //   this.addProductForm.reset();
  //   this.formData = new FormData;
  //   this.toast.success('Updated Successfully');
  //   jQuery("#updateProduct").modal("hide");
  // });
}
}
