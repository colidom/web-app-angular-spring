import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent  implements OnInit {

  customers: Customer[] | undefined;
  
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      // Función anónima
      customers => this.customers = customers  
    );
  }

  delete(customer: Customer): void {

    swal.fire({
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
            swal.fire(
              'Deleted!',
              `${customer.name} ${customer.surname} has been deleted.`,
              'success'
            )
          }
        )
      }
    })
  }
}
