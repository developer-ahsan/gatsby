import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
declare var jQuery:any;

@Component({
  selector: 'app-mycollections',
  templateUrl: './mycollections.component.html',
  styleUrls: ['./mycollections.component.scss']
})
export class MycollectionsComponent implements OnInit {
  dtOptions = {}
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  collections: any;
  ngQty: any;
  delId: any;
  submitProd: any;
  submitPriceForm: any;
  reviewForm: FormGroup;

  formData = new FormData;
  ngAddress = "";
  totalSum: any;
  totalQuan: any;
  reviewProd: any;
  appearanceRate = 5;
  uniquenessRate = 5;
  prestigeRate = 5;
  valueRate = 5;
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      order : [10, 'desc'],
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
       }]
    };
    this.getmyCollections();
    this.submitPriceForm = new FormGroup({
      price_you_saw: new FormControl('', [Validators.required]),
      store_name: new FormControl('', [Validators.required]),
      store_address: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      message: new FormControl(''),
      id: new FormControl(''),
      user_id: new FormControl(''),
    });
    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      overall: new FormControl('', [Validators.required]),
      appearance: new FormControl('', [Validators.required]),
      prestige: new FormControl('', [Validators.required]),
      uniueness: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
  }
  getmyCollections() {
    this.collections = null;
    this.spinner.show();
    this.api.get('getmyCollections/'+localStorage.getItem('user_id')).subscribe((data) => {
      this.spinner.hide();
      if (!data.Error) {
        this.collections = data.collection;
        this.totalSum = data.collectionSum;
        this.totalQuan = data.quantity;
      }
    })
  }
  delCollection(id) {
    this.delId = id;
    jQuery("#delcollection").modal("show");
  }
  deleteCollections() {
    this.spinner.show();
    this.api.get('deleteCollection/'+this.delId).subscribe((data) => {
      this.spinner.hide();
      if (!data.Error) {
        this.toast.success('Deleted Successfully');
         jQuery("#delcollection").modal("hide");

        this.getmyCollections();
      }
    })
  }
  updateCollections(id,j) {
    const d = (<HTMLInputElement>document.getElementById('input'+j)).value;
    if(d == '' || Number(d) < 0) {
      this.spinner.hide();
      this.toast.warning('Quantity should be greater than 0');
    } else {
      this.api.get('updateCollection/'+id+'/'+d).subscribe((data) => {
        this.spinner.hide();
        if (!data.Error) {
          this.toast.success('Updated Successfully');
          this.getmyCollections();
        }
      })
    }
  }
  getInputValue(d) {
    this.ngQty = d;
  }
  getSubmitProduct(index) {
    this.submitProd = this.collections[index];
    this.submitPriceForm.patchValue({
      id: this.submitProd.product_id,
      user_id: localStorage.getItem('user_id')
    })
    jQuery("#submitPrice").modal("show");

  }
  getSubmitReviewModal(index, length) {

    if(length == 0) {
      this.reviewProd = this.collections[index];
      jQuery("#myModal").modal("show");  
    } else {
      Swal.fire("Hey "+localStorage.getItem('UserName'), "You already reviewed this product! ", "success");
    }
    
  }
  addRatings() {
    const params = {
      appearance: this.appearanceRate,
      prestige: this.prestigeRate,
      uniqueness: this.uniquenessRate,
      value: this.valueRate,
      user_id: localStorage.getItem('user_id'),
      product_id: this.reviewProd.product_id
    }
    this.spinner.show();
    // Object.keys(this.reviewForm.controls).forEach(key => {
    //   let val = this.reviewForm.get(key).value;
    //   this.formData.append(key, val);
    // });
    // this.formData.append('user_id', localStorage.getItem('user_id'));
    // this.formData.append('product_id', this.activeRoute.snapshot.params.id);
    this.api.post('addReview', params).subscribe((data) => {
      this.spinner.hide();
      if(!data.Error) {
        this.toast.success('Review Submitted Successfully');
        jQuery("#myModal").modal("hide");
        this.formData = new FormData;
        this.getmyCollections()
        this.reviewForm.reset();
      }
    })

  }
  addPriceRequest() {
    this.submitPriceForm.patchValue({
      price_you_saw: parseFloat(this.submitPriceForm.get('price_you_saw').value.replace(/,/g, ''))
    })
    Object.keys(this.submitPriceForm.controls).forEach(key => {
      let val = this.submitPriceForm.get(key).value;
      this.formData.append(key, val);
    });
    this.spinner.show();
    this.api.post('submitPriceWebsiteByProductID', this.formData).subscribe((data) => {
      this.toast.success('Price Submitted Successfully');
      this.submitPriceForm.reset();
        this.formData = new FormData;
        this.spinner.hide();
      jQuery("#submitPrice").modal("hide");
      if (data.percentage > 0 && data.percentage < 19) {
        this.toast.success(data.percentage,'Thanks for providing that price. It looks like it was')
      } else if (data.pecentage > 19 && data.percentage < 35) {
        this.toast.warning(data.percentage,'Thanks for providing that price. It looks like it was')
      } else {
        this.toast.error(data.percentage,'Thanks for providing that price. It looks like it was')

      }
    })
  }

  inputChange(r) {
    console.log(r.target.value)
    if(r.target.value == '') {
      this.ngAddress = ''
      this.submitPriceForm.patchValue({
        store_address: '',
        store_name: ''
      });
    }
    var pacContainerInitialized = false;
    if (!pacContainerInitialized) {
      $('.pac-container').css('z-index', '9999');
      pacContainerInitialized = true;
    }
  }
  public handleAddressChange(address: Address) {
    console.log(address);
    const location = String(address.formatted_address).split(',');
      this.submitPriceForm.patchValue({
        store_address: address.formatted_address,
        store_name: address.name
      });
      this.ngAddress = address.name
  }
  onFileChange(event) {
    this.formData = new FormData;
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
}
