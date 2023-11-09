import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Products } from '../models/Products';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';
  private log: boolean = false;

  constructor(private http: HttpClient) {
    var url = window.location;
    this.apiUrl = `${environment.ApiUrl}`
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
    return this.http.post(this.apiUrl + '/produtos', product);
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
