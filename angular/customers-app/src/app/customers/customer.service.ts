import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './customers.json';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/api/customers';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{ 
    // return of(CUSTOMERS); // Convert to stream
    return this.http.get<Customer[]>(this.urlEndpoint)
  };

  create(customer: Customer) : Observable<Customer> {
    return this.http.post<Customer>(this.urlEndpoint, customer, {headers: this.httpHeaders})
  }
}
