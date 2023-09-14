import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { ModalService } from './detail/modal.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers: Customer[] | undefined;
  paginator: any;
  selectedCustomer: Customer;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.customerService.getCustomers(page)
        .pipe(
          tap(response => {
            (response.content as Customer[]).forEach(customer => {
              console.log(customer.name);
            });
          })
        ).subscribe(response => {
          this.customers = response.content as Customer[],
            this.paginator = response;
        });
    });

    this.modalService.notifyUpload.subscribe(customer => {
      this.customers = this.customers.map(originalCustomer => {
        if (customer.id == originalCustomer.id) {
          originalCustomer.picture = customer.picture
        }
        return originalCustomer
      })
    });
  }

  delete(customer: Customer): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `${customer.name} ${customer.surname} will be deleted. You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.customerService.delete(customer.id).subscribe(
          response => {
            this.customers = this.customers?.filter(cli => cli !== customer)
            Swal.fire(
              'Deleted!',
              `${customer.name} ${customer.surname} has been deleted.`,
              'success'
            )
          }
        )
      }
    })
  }

  openModal(customer: Customer) {
    this.selectedCustomer = customer;
    this.modalService.openModal();
  }
}
