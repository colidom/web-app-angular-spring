import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/api/customers';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(): Observable<Customer[]>{ 
    return this.http.get<Customer[]>(this.urlEndpoint)
  };

  getCustomer(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/customers']);
        console.error(e.error.message);
        swal.fire('Error while editing', e.error.message, 'error');
        return throwError(() => e);
      })
    )
  }

  create(customer: Customer) : Observable<any> {
    return this.http.post<Customer>(this.urlEndpoint, customer, {headers: this.httpHeaders}).pipe(
      catchError((e) => {
        console.error(e.error.message);
        swal.fire(e.error.message, e.error.error , 'error');
        return throwError(() => e);
      })
    );
  }

  update(customer: Customer) : Observable<any> {
    return this.http.put<Customer>(`${this.urlEndpoint}/${customer.id}`, customer,{ headers: this.httpHeaders }).pipe(
      catchError((e) => {
        console.error(e.error.message);
        swal.fire(e.error.message, e.error.error , 'error');
        return throwError(() => e);
      })
    )
  }

  delete(id: number | any) : Observable<Customer> {
    return this.http.delete<Customer>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError((e) => {
        console.error(e.error.message);
        swal.fire(e.error.message, e.error.error , 'error');
        return throwError(() => e);
      })
    )
  }
}
