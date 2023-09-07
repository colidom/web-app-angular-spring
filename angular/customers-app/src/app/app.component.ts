import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Welcome to Angular';
  course: string = 'Spring 5 with Angular 7 Course';
  student: string = 'Carlos Oliva';
}
