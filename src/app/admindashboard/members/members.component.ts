import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';

// update
declare var jQuery:any;
declare var $: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit,AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  startDate: any;
  endDate: any;

  customers: any;
  customerID: any;
  arrayIndex: any;
  dtOptions = {};
  // update
  masterSelected:boolean;
  checklist:any;
  checkedList:any = [];
  checkedListDelete:any=[];
  customerForm: FormGroup
// update
tempTable: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public Auth: AuthService,
    public router: Router,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    // update
    private excelService:ExcelService
    // update
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnInit(): void {
    $(".start").on("change", function() {
      var date = $(this).val();
    })
    this.initializeDtOption();
    this.getSubmittedPrices();
    // update
    this.masterSelected = false;
// update
    this.customerForm = new FormGroup({
      f_name: new FormControl('',Validators.required),
      l_name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      username: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      id: new FormControl(''),
    })
    
    // this.getSubmittedPrices('check');
  }
  resetState() {
    this.router.navigate(['/admin/members/show/all']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
  filterState() {
    console.log(this.startDate)
    if(!this.startDate) {
      this.toastr.warning('Please Select Start Date');
    } else if(!this.endDate) {
      this.toastr.warning('Please Select End Date');
    } else {
      // this.startDate = this.startDate.month + '-' + this.startDate.day +'-'+this.startDate.year;
      // this.endDate = this.endDate.month + '-' + this.endDate.day +'-'+this.endDate.year;
      // this.FilterByDate();
      this.router.navigateByUrl('/admin/members/' + this.startDate +'/' + this.endDate);
      setTimeout(() => {
        window.location.reload();  
      }, 10);
    }
    
  }
  initializeDtOption() {
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
      { width: 150, targets: 12 }
    ],
    select: {
        style:    'multi',
        selector: 'td:first-child'
    },
      scrollX: true,
    } 
  }
  someClickHandler(info: any): void {
    console.log(info)
  }
  getSubmittedPrices() {
    this.customers = null;
    this.spinner.show();
    this.api.get('getCustomers').subscribe((data)=> {
      this.spinner.hide()
      // update      
        this.customers = data.customers.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
      
    })
  }
  FilterByDate() {
    if(this.startDate == undefined || this.endDate == undefined) {
      this.toastr.warning('Please Select Dates');

    } else {
      let tDate = this.startDate.year + '-' + this.startDate.month + '-' +this.startDate.day
      let stDate  = moment(tDate).format('YYYY-MM-DD');
      let eDate = this.endDate.year + '-' + this.endDate.month + '-' +this.endDate.day
      let enDate  = moment(eDate).format('YYYY-MM-DD');
      if(stDate && enDate) {
        this.spinner.show();
        const params = {
          start: stDate,
          end: enDate
        }
        this.customers = null;
      this.api.post('getCustomersFiltered',params).subscribe((data)=> {
        this.spinner.hide()
        this.customers = data.customers.map(function(el) {
          var o = Object.assign({}, el);
          o.isSelected = false;
          return o;
        })
      })
      } else {
        this.toastr.warning('Please Select Dates');
      }
    }
    
    
    
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();     
   });
  }
  updateCustomerModal(item) {
    console.log(item)
    this.customerForm.patchValue({
      id: item.id,
      f_name: item.f_name,
      l_name: item.l_name,
      email: item.email,
    })
    if(item.user_details) {
      this.customerForm.patchValue({
        phone: item.user_details.phone,
        address: item.user_details.address,
        username: item.user_details.username,
      })
    }
    jQuery("#updateCustomerModal").modal("show");
  }
  updateCustomerRecord() {
    this.spinner.show();
    this.api.post('updateCustomerRecord',this.customerForm.value).subscribe((res) => {
      this.spinner.hide();
      jQuery("#updateCustomerModal").modal("hide");
      this.customers.filter(value=>{
        if(value.id == this.customerForm.get('id').value) {
          value.f_name = this.customerForm.get('f_name').value
          value.l_name = this.customerForm.get('l_name').value
          value.phone = this.customerForm.get('phone').value
          value.address = this.customerForm.get('address').value
          value.username = this.customerForm.get('username').value
        }
      })
      // this.getSubmittedPrices();
    })
  }
  delCustomer(id, index) {
    this.customerID = id;
    console.log(this.customerID)
    this.arrayIndex = index;
    jQuery("#delCustomer").modal("show");
  }
  deleteCustomer() {
    //update
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleCustomer/';
    }else{
      requestData = this.customerID;
      key = 'delCustomer/';
    }        
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        if(key == 'delCustomer/') {
          this.customers.splice(this.arrayIndex, 1);
        } else {
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedListDelete = [];
          this.checkedList = []
        }
        jQuery("#delCustomer").modal("hide");
        
        // this.getSubmittedPrices('delete');
      }
    })
  }
  loginasCustomer(index) {
    localStorage.setItem('user_id', this.customers[index].id);

    this.Auth.setAuthUser(this.customers[index]);
    this.Auth.setIsAdmin(this.customers[index].user_type);
    this.router.navigateByUrl('/dashboard')
  }
  // update
  checkUncheckAll() {
    for (var i = 0; i < this.customers.length; i++) {
      this.customers[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.customers.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.customers.length; i++) {
      if(this.customers[i].isSelected)
      this.checkedList.push(this.customers[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.customers
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Date_SignUp : checkedItem[i].created_at,
        Full_Name : checkedItem[i].f_name + ' ' +checkedItem[i].l_name,
        Username : checkedItem[i].user_details?.username,
        Email : checkedItem[i].email,
        Phone : checkedItem[i].user_details?.phone,
        Prices_Submitted : checkedItem[i].submit_price_count,
        Location : checkedItem[i].user_details?.address,
        NOI_in_Collection : checkedItem[i].collection_count
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
    jQuery("#delCustomer").modal("show");

  }
  //update`
}
