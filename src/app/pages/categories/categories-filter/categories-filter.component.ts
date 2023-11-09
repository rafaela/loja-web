import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesFilterComponent {

  filter: any;

  public model = {}

  constructor(private router: Router,){
     
  }

  inserir(){
    this.router.navigate([this.router.url + '/0']);
  }

  limpar(){
    this.model = {}
  }

  pesquisar(){

  }

}
