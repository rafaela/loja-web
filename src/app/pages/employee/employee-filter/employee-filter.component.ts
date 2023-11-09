import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.scss']
})
export class EmployeeFilterComponent {
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
