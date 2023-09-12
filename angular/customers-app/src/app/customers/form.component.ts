import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public customer: Customer = new Customer();
  public title:string = "Customer creation";
  
  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
      this.loadCustomer();
    }

  loadCustomer(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.customerService.getCustomer(id).subscribe( 
          (customer) => this.customer = customer)
      }
    })
  }

  create(): void {
    this.customerService.create(this.customer)
      .subscribe(json => {
      this.router.navigate(['/customers'])
      Swal.fire('Customer Saved', `${json.message}: ${json.customer.name}`, 'success')
    }
    );
  }

  update(): void {
    this.customerService.update(this.customer)
    .subscribe( json => {
      this.router.navigate(['/customers'])
      Swal.fire('Customer updated', `${json.message}: ${json.customer.name}`, 'success')
    })
  }
}
