import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// update
import { CsvDataService } from './../../services/csv-service';
import {ExcelService} from './../../services/excel.service';
// update
declare var jQuery:any;

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {
  addProductForm: FormGroup;
  formData = new FormData;
  products: any;
  category: any;
  brand: any;
  delID: any;
  arrayIndex: any;
  bulkProductForm: any;
  productId = '';
  ratings: any;
  dtOptions = {};
    // update
    masterSelected:boolean;
    checklist:any;
    checkedList:any=[];
    checkedListDelete:any=[];
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
// update
    this.dtOptions = {
      order: [0, 'desc'],
      processing: true,
      dom: 'lBfrtip',
      language: {
        "lengthMenu": "_MENU_"
     },
        buttons: [
            'copy', 'print',

        ],
      select: true,

    };
    this.initialize();
    this.getProduct();
    this.getCategory();
  }
  initialize() {
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
    });
    this.bulkProductForm = new FormGroup({
      excel: new FormControl('', [Validators.required]),
    });
  }
  onFileChange(event, value) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          this.formData.append('image', event.target.files[0]);
      };
    }
  }
  addProduct() {
    this.spinner.show();
    Object.keys(this.addProductForm.controls).forEach(key => {
      let val = this.addProductForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addProduct', this.formData).subscribe((data) => {
      this.spinner.hide();
      this.formData = new FormData;
      this.addProductForm.reset();
      jQuery("#addProduct").modal("hide");
      if(!data.Error) {
        this.toast.success('Product added Successfully');
        this.getProduct();
      }
    });
  }
  getProduct() {
    this.products = null;
    this.spinner.show();
    this.api.get('getProduct').subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.products = data.products;
        // update      
          this.products = data.products.map(function(el) {
            var o = Object.assign({}, el);
            o.isSelected = false;
            return o;
          })
          console.log(this.products)
        // update
      }
    });
  }
  getCategory() {
    this.spinner.show();
    this.api.get('getCategory').subscribe((data) => {
      this.spinner.hide();
      if(data.success) {
        this.category = data.category;
      }
    })
  }
  getBrand() {
    this.api.get('getModel').subscribe((data) => {
      if(data.success) {
        this.brand = data.brand;
      }
    })
  }
  delProduct(id, index) {
    this.delID = id;
    this.arrayIndex = index;
    jQuery("#delproduct").modal("show");
  }
  deleteProduct() {
    //update
    let requestData,key;
    this.checkedListDelete = this.checkedList.map(a => a.id); 
    if(this.checkedListDelete.length !== 0){
      requestData = this.checkedListDelete;
      key = 'delMultipleProduct/';
    }else{
      requestData = this.delID;
      key = 'delProduct/';
    }        
    console.log(requestData)
    this.spinner.show();
    this.api.get(key+requestData).subscribe((data) => {
    //update
      this.spinner.hide();
      if(data.success) {
        jQuery("#delproduct").modal("hide");
        this.products.splice(this.arrayIndex, 1);
        this.getProduct();
      }
    })
  }
  uploadProducts() {
    this.spinner.show();
    this.api.post('addBulkProduct', this.formData).subscribe(data => {
      console.log(data);
      this.formData = new FormData;
      this.bulkProductForm.reset();
      this.spinner.hide();
      jQuery("#addProductFile").modal("hide");

      this.getProduct();
    })
  }
  getProductById(id) {
    this.productId = id;
    this.spinner.show();
    this.api.get('getProductByID/'+id).subscribe((data) => {
      this.spinner.hide();
      this.addProductForm.patchValue({
        prod_id: data.product.productID,
        category: data.product.category,
        brand: data.product.brand,
        name: data.product.name,
        msrp: data.product.msrp,
        market_value: data.product.market_value,
        upc: data.product.upc,
        ref: data.product.ref,
        size: data.product.size,
        year: data.product.year,
        other1: data.product.other1,
        other2: data.product.other2,
        other3: data.product.other3
      });
      jQuery("#updateProduct").modal("show");
    })
  }
  updateProduct() {
    this.spinner.show();
    Object.keys(this.addProductForm.controls).forEach(key => {
      let val = this.addProductForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateProductByID/'+this.productId, this.formData).subscribe(data => {
      this.spinner.hide();
      this.addProductForm.reset();
      this.formData = new FormData;
      this.toast.success('Updated Successfully');
      jQuery("#updateProduct").modal("hide");

      this.getProduct();
    });
  }
  ChangeValue(ev) {
    this.spinner.show();
      this.api.get('getModelById/' + ev).subscribe((data) => {
        this.spinner.hide();
        if(data.success) {
          this.brand = data.brand;
        }
      })
  }
  getRatings(id) {
    this.spinner.show();
    this.api.get('getProductRating/'+id).subscribe((data) => {
      jQuery("#productRating").modal("show");
      this.spinner.hide();
      this.ratings = data.ratings
    })

  }
  // update
  checkUncheckAll() {
    for (var i = 0; i < this.products.length; i++) {
      this.products[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.products.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.products.length; i++) {
      if(this.products[i].isSelected)
      this.checkedList.push(this.products[i]);
    }
    console.log(this.checkedList)
  }

  exportCsv(btnName):void {
    let exportedList = [];
    console.log(this.checkedList.length)
    let checkedItem = this.checkedList;
    if(this.checkedList.length == 0){
      checkedItem = this.products
      console.log(checkedItem)
    }
    for(let i=0; i<checkedItem.length; i++){
      let obj={
        Category : checkedItem[i].category,
        Brand : checkedItem[i].brand,
        Product_Name : checkedItem[i].name,
        MSRP : checkedItem[i].msrp,
        Market_Value : checkedItem[i].market_value,
        Variation_from_MSRP : checkedItem[i].variation,
        UPC : checkedItem[i].upc,
        RefNo : checkedItem[i].ref,
        Size : checkedItem[i].size,
        Year : checkedItem[i].year,
      }
      exportedList.push(obj);      
    }
    console.log(exportedList)
    if(btnName == 'xlsxBtn')
    this.excelService.exportAsExcelFile(exportedList, 'Gatsby');
    CsvDataService.exportToCsv('Gatsby.csv', exportedList);
  }
  delSelectedItem(){
    this.checkedListDelete = this.checkedList.map(a => a.id);
    jQuery("#delproduct").modal("show");

  }
  // update
}
