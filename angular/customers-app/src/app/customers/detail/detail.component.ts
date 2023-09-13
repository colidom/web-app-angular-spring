import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'customer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  customer: Customer;
  title: string = "Customer detail";
  private selectedPicture: File;

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
    console.log(this.selectedPicture);
  }

  uploadPicture() {
    this.customerService.uploadPicture(this.selectedPicture, this.customer.id)
      .subscribe(customer => {
        this.customer = customer;
        Swal.fire("Picture correctly uploaded!", `Picture uploaded: ${customer.picture}`, "success");
      })
  }
}
