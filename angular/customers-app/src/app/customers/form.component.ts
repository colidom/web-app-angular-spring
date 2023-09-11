import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

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
    this.customerService.create(this.customer).subscribe(
      response =>  this.router.navigate(['/customers'])
    )
  }

}
