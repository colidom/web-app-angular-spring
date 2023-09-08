import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './customers.json';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent  implements OnInit {

  customers: Customer[] | undefined;

  constructor() {
    
  }

  ngOnInit() {
    this.customers = CUSTOMERS;
  }
}
