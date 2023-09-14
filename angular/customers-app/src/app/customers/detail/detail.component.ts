import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'customer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  customer: Customer;
  title: string = "Customer detail";
  selectedPicture: File;
  progress: number;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');

      if (id) {
        this.customerService.getCustomer(id).subscribe(customer => {
          this.customer = customer;
        })
      }
    })
  }

  selectPicture(event: any) {
    this.selectedPicture = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPicture);
    if (this.selectedPicture.type.indexOf('image') < 0) {
      Swal.fire("¡Error uploading profile picture!", "The selected file must be a picture! Please choose another one.", "error");
      this.selectedPicture = null;
    }
  }

  uploadPicture() {

    if (!this.selectedPicture) {
      Swal.fire("¡Error uploading profile picture!", "You must select a picture.", "error");
    } else {
      this.customerService.uploadPicture(this.selectedPicture, this.customer.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.customer = response.customer as Customer;
            Swal.fire("Picture correctly uploaded!", response.message, "success");
          }
        });
    }
  }
}
