import { Component } from '@angular/core';
import { Customer } from './customer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  private customer: Customer = new Customer();
  private title:string = "Customer creating"
  constructor() {}

  public create(): void {
    console.log("clicked");
    console.log(this.customer);
  }

}
