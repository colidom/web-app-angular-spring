import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './customers.json';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Customer[]{ 
    return CUSTOMERS
  };
}
