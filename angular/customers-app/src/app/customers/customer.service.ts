import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';

import { Customer } from './customer';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/api/customers';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('CustomerService: tap 1(minúscula)');
        (response.content as Customer[]).forEach(customer => {
          console.log(customer.name)
        })
      }),
      map((response: any) => {
        (response.content as Customer[]).map(customer => {
          customer.name = customer.name.toUpperCase();
          let datePipe = new DatePipe('es');
          customer.createdAt = datePipe.transform(customer.createdAt, 'EEEE dd, MMMM yyyy');
          // customer.createdAt = formatDate(customer.createdAt, 'dd-MM-yyyy', 'en-US') // Otra forma de hacerlo
          return customer;
        });
        return response;
      }
      ),
      tap(response => {
        console.log('CustomerService: tap 2(mayúscula)');
        (response.content as Customer[]).forEach(customer => {
          console.log(customer.name)
        });
      })
    );
  }

  getCustomer(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/customers']);
        console.error(e.error.message);
        Swal.fire('Error while editing', e.error.message, 'error');
        return throwError(() => e);
      })
    )
  }

  create(customer: Customer): Observable<any> {
    return this.http.post<Customer>(this.urlEndpoint, customer, { headers: this.httpHeaders }).pipe(
      catchError((e) => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        console.error(e.error.message);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<Customer>(`${this.urlEndpoint}/${customer.id}`, customer, { headers: this.httpHeaders }).pipe(
      catchError((e) => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        console.error(e.error.message);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  delete(id: number | any): Observable<Customer> {
    return this.http.delete<Customer>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        console.error(e.error.message);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  uploadPicture(file: File, id: any): Observable<HttpEvent<{}>> {
    let formData = new FormData;
    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
