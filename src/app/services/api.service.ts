import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Products } from '../models/Products';
import { Response } from '../models/Response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';
  private log: boolean = false;

  result: any;

  constructor(private http: HttpClient, private router: Router) {
    var url = window.location;
    this.apiUrl = `${environment.ApiUrl}`
   }

  async login(login){
    this.result = await this.http.post(`${this.apiUrl}/login`, login).toPromise();
    if(this.result && this.result.sucess){
      window.localStorage.setItem('token', this.result.token);
      return true;
    }
    return false;
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  //CRUD DE CATEGORIAS
  /*getCategoriesNameInactive(category) : Observable<any>{
    return this.http.get(this.apiUrl + '/buscas',category);
  }*/
  getCategories() : Observable<any>{
    return this.http.get(this.apiUrl + '/categorias');
  }

  createCategory(category) :  Observable<any>{
    return this.http.post(this.apiUrl + '/categorias/0', category);
  }

  updateCategory(id, category) :  Observable<any>{
    return this.http.put(this.apiUrl + '/categorias/'+ id , category);
  }

  deleteCategory(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/categorias/' + id, id);
  }

  getCategoryByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/categorias/'+ id, id);
  }
 //CRUD DE PRODUTOS
  getProducts() : Observable<any>{
    return this.http.get(this.apiUrl + '/produtos');
  }

  createProduct(product) :  Observable<any>{
    return this.http.post(this.apiUrl + '/produtos/0', product);
  }

  updateProduct(id, category) :  Observable<any>{
    return this.http.put(this.apiUrl + '/produtos/'+ id , category);
  }

  deleteProduct(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/produtos/' + id, id);
  }

  getProductByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/produtos/' + id, id);
  }


  ///CRUD EMPLOYEE

  getEmployees() : Observable<any>{
    return this.http.get(this.apiUrl + '/funcionarios');
  }

  createEmployee(employee) :  Observable<any>{
    console.log(employee)
    return this.http.post(this.apiUrl + '/funcionarios/0', employee);
  }

  updateEmployee(id, employee) :  Observable<any>{
    return this.http.put(this.apiUrl + '/funcionarios/'+ id , employee);
  }

  deleteEmployee(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/funcionarios/' + id, id);
  }

  getEMployeeByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/funcionarios/'+ id, id);
  }


  
}
