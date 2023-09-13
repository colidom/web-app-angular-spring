import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectiveComponent } from './directive/directive.component';
import { CustomersComponent } from './customers/customers.component';
import { FormComponent } from './customers/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CustomerService } from './customers/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DetailComponent } from './customers/detail/detail.component';

registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'directives', component: DirectiveComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/page/:page', component: CustomersComponent },
  { path: 'customers/form', component: FormComponent },
  { path: 'customers/form/:id', component: FormComponent },
  { path: 'customers/detail/:id', component: DetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomersComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
