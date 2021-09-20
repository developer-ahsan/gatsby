import { ApiService } from './../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
// update
declare var jQuery:any;

@Component({
  selector: 'app-modelandcategory',
  templateUrl: './modelandcategory.component.html',
  styleUrls: ['./modelandcategory.component.css']
})
export class ModelandcategoryComponent implements OnInit {
  categoryForm: FormGroup;
  modelForm: FormGroup;
  brand: any;
  category: any;
  delID: any;
  arrayIndex: any;
  // update
  dtOptions = {};
  masterSelected:boolean;
  checklist:any;
  checkedList:any=[];
  checkedListDelete:any=[];
  // update
  // update
  dtOptionsBrand = {};
  masterSelectedBrand:boolean;
  checklistBrand:any;
  checkedListBrand:any=[];
  checkedListDeleteBrand:any=[];
  tempTable: DataTables.Api;
  tempTable1: DataTables.Api;
  // update
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    // update
    private excelService:ExcelService
    // update
  ) { }

  ngOnInit(): void {
    // update
    this.masterSelected = false;
    this.dtOptions = {
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_",
        search: "",
        searchPlaceholder: "Search"
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
// update
// update
this.masterSelectedBrand = false;
this.dtOptionsBrand = {
  order: [1, 'desc'],
  processing: true,
  dom: 'lBfrtip',
  language: {
    "lengthMenu": "_MENU_",
    search: "",
    searchPlaceholder: "Search"
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
        this.tempTable1 = $('#dataTable1').DataTable()
          var count = this.tempTable1.rows( { selected: true } ).count();
          var data = this.tempTable1.rows( { selected: true } ).data();
          // console.log(data);
          for (let index = 0; index < count; index++) {
            let val = {
              id: data[index][2]
            }
            this.checkedListBrand[index] = val
          }
          if(count > 0) {
            this.delSelectedBrandItem()
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
  }
// update
    this.initialize();
    this.getBrand();
    this.getCategory();
  }
  initialize() {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      content: new FormControl(''),
      id: new FormControl(''),
    });
    this.modelForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });

  }
  getCategory() {
    this.spinner.show();
    this.api.get('getCategory').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.category = data.category;
        // update      
      this.category = data.category.map(function(el) {
        var o = Object.assign({}, el);
        o.isSelected = false;
        return o;
      })
      console.log(this.category)
      // update
      }
    })
  }
  getBrand() {
    this.api.get('getModel').subscribe((data) => {
      if(data.success) {
        this.brand = data.brand;
        // update      
      this.brand = data.brand.map(function(el) {
        var o = Object.assign({}, el);
        o.isSelected = false;
        return o;
      })
      console.log(this.brand)
      // update
      }
    })
  }
  addCategory() {
    this.spinner.show();
    this.api.post('addCategory', this.categoryForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#homeBanner").modal("hide");
        this.categoryForm.reset();
        this.toast.success('Category Added Successfully');
        // this.getCategory();
        window.location.reload()
      }
    })
  }
  addBrand() {
    this.spinner.show();
    this.api.post('addModel', this.modelForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#sellnow").modal("hide");
        this.modelForm.reset();
        this.toast.success('Brand Added Successfully');
        // this.getBrand();
        window.location.reload();
      }
    })
  } 
  delCategory(id, index) {
    this.delID = id;
    this.arrayIndex = index;
    jQuery("#delmainbanner").modal("show");
  }
  delBrand(id, index) {
    this.delID = id;
    this.arrayIndex = index;
    jQuery("#delsellbanner").modal("show");
  }
  deleteCategory() {
    //update
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleCategory/';
    }else{
      requestData = this.delID;
      key = 'deleteCategory/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delmainbanner").modal("hide");
        if(key == 'deleteCategory/') {
          this.category.splice(this.arrayIndex, 1);
        } else {
          this.checkedListDelete = [];
          this.tempTable.rows( '.selected' ).remove().draw();
          this.checkedList = []
        }
        
        // this.getCategory();
      }
    })
  }
  deleteBrand() {
    //update
    let requestData,key;
    this.checkedListDeleteBrand = this.checkedListBrand.map(a => a.id); 
    if(this.checkedListDeleteBrand.length !== 0){
      requestData = this.checkedListDeleteBrand;
      key = 'deleteMultipleModel/';
    }else{
      requestData = this.delID;
      key = 'deleteModel/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
      //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delsellbanner").modal("hide");
        if(key == 'deleteModel/') {
          this.brand.splice(this.arrayIndex, 1);
        } else {
          this.checkedListDeleteBrand = []
        this.checklistBrand = []
        this.tempTable1.rows( '.selected' ).remove().draw();
        }
        
        // this.getBrand();
      }
    })
  }

  updateCategory(id, value, coon) {
    this.categoryForm.patchValue({
      id: id,
      category: value,
      content: coon
    })
    jQuery("#updateCat").modal("show");
  }
  updateBrand(id, c, b) {
    this.modelForm.patchValue({
      id: id,
      category: c, 
      brand: b
    })
    jQuery("#updateBrand").modal("show");
  }
  updateCat() {
    this.spinner.show();
    this.api.post('updateCategoryByID',this.categoryForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#updateCat").modal("hide");
        this.getCategory();
      }
    })
  }
  updateBra() {
    this.spinner.show();
    this.api.post('updateModelByID',this.modelForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        jQuery("#updateBrand").modal("hide");
        this.getBrand();
      }
    })
  }
  // update Category
  checkUncheckAll() {
    for (var i = 0; i < this.category.length; i++) {
      this.category[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.category.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.category.length; i++) {
      if(this.category[i].isSelected)
      this.checkedList.push(this.category[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.category
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Category : checkedItem[i].category,
        Text : checkedItem[i].content,        
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
    jQuery("#delmainbanner").modal("show");

  }
  //update Category
  // update Brand
  checkUncheckAllBrand() {
    for (var i = 0; i < this.brand.length; i++) {
      this.brand[i].isSelected = this.masterSelectedBrand;
    }
    this.getCheckedItemListBrand();
  }
  isAllSelectedBrand() {
    this.masterSelectedBrand = this.brand.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemListBrand();
  }

  getCheckedItemListBrand(){
    this.checkedListBrand = [];
    for (var i = 0; i < this.brand.length; i++) {
      if(this.brand[i].isSelected)
      this.checkedListBrand.push(this.brand[i]);
    }
    console.log(this.checkedListBrand)
  }

  exportBrandCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedListBrand.length)
    let checkedItem = this.checkedListBrand;
    if(this.checkedListBrand.length == 0){
      checkedItem = this.brand
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Category : checkedItem[i].categoriess?.category,
        Brand : checkedItem[i].model,
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
  delSelectedBrandItem(){
    this.checkedListDeleteBrand = this.checkedListBrand.map(a => a.id);
    jQuery("#delsellbanner").modal("show");

  }
  //update Brand
}
