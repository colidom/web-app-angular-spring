import { Component } from '@angular/core';
import { Customer } from './customer';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent {

  customers: Customer[] = [
    {id: 1, name: 'Carlos', surname: 'Oliva', createdAt: '2023-09-08', email: 'colidom@outlook.com'},
    {id: 2, name: 'Javier', surname: 'Oliva', createdAt: '2023-09-08', email: 'colidom@outlook.com'},
    {id: 3, name: 'Jhon', surname: 'Doe', createdAt: '2023-09-08', email: 'jhondoe@outlook.com'},
    {id: 4, name: 'Fran', surname: 'Franco', createdAt: '2023-09-08', email: 'francisfranco@outlook.com'},
    {id: 5, name: 'David', surname: 'Yanes', createdAt: '2023-09-08', email: 'davidyanes@outlook.com'},
    {id: 6, name: 'Tim', surname: 'Berners-Lee', createdAt: '2023-09-08', email: 'timbernerslee@outlook.com'},
  ];

  constructor() {
    
  }
}
