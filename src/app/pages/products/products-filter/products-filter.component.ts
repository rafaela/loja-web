import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsFilterComponent {

  public model = {
    Name: '',
    Category: null
  }

  constructor(private router: Router,){
     
  }

  inserir(){
    this.router.navigate([this.router.url + '/0']);
  }

  rowSelected(row){
    console.log(row)
  }

}
