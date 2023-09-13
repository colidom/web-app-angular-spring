import { Component, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() paginator: any;

  pages: number[];

  constructor() { }

  ngOnInit() {
    this.pages = new Array(this.paginator.totalPages).fill(0).map((_value, index) => index + 1);
  }
}
