import { Component } from '@angular/core';
import { Customer } from './customer';
import { Region } from './region';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public customer: Customer = new Customer();
  regions: Region[];
  public title: string = "Customer creation";
  public errors: string[];

  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.customerService.getCustomer(id).subscribe(
          (customer) => this.customer = customer)
      }
    });
    this.customerService.getRegions()
      .subscribe(regions => this.regions = regions);
  }

  create(): void {
    this.customerService.create(this.customer)
      .subscribe(json => {
        this.router.navigate(['/customers'])
        Swal.fire('Customer Saved', `${json.message}: ${json.customer.name}`, 'success')
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error("Backend error code: " + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.customerService.update(this.customer)
      .subscribe(json => {
        this.router.navigate(['/customers'])
        Swal.fire('Customer updated', `${json.message}: ${json.customer.name}`, 'success')
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error("Backend error code: " + err.status);
          console.error(err.error.errors);
        }
      );
  }
}
