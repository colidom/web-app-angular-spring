import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent {
  courseList: string[] = ['TypeScript', 'JavaScript', 'Java', 'C#', 'PHP'];

  constructor() { }
}
