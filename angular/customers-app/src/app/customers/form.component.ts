import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public customer: Customer = new Customer();
  public title:string = "Customer creation";
  
  constructor(private customerService: CustomerService,
    private router: Router) {}

  public create(): void {
    this.customerService.create(this.customer)
      .subscribe(customer => {
      this.router.navigate(['/customers'])
      swal.fire('Customer Saved', `Customer ${customer.name} successfully created!`, 'success')
    }
    );
  }
}
