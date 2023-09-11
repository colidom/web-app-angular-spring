import { Component } from '@angular/core';
import { Customer } from './customer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public customer: Customer = new Customer();
  public title:string = "Customer creation"
  constructor() {}

  public create(): void {
    console.log("clicked");
    console.log(this.customer);
  }

}
