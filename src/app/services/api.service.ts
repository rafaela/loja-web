import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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
      window.sessionStorage .setItem('token', this.result.token);
      return true;
    }
    return false;
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  //CRUD DE CATEGORIAS
  getCategories(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/categorias', data);
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

  deleteSubcategoria(subcategoria) :  Observable<any>{
    console.log(subcategoria)
    return this.http.delete(this.apiUrl + '/subcategorias/' + subcategoria.id, subcategoria.id);
  }


  getCategoryByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/categorias/'+ id, id);
  }
 //CRUD DE PRODUTOS
  getProducts(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/produtos', data);
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

  deleteImage(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/imagem/' + id, id);
  }


  ///CRUD EMPLOYEE

  getEmployees(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/funcionarios', data);
  }

  createEmployee(employee) :  Observable<any>{
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

  //Crud Frete

  createFreigth(frete) :  Observable<any>{
    return this.http.post(this.apiUrl + '/frete', frete);
  }

  updateFreigth(id, frete) :  Observable<any>{
    return this.http.put(this.apiUrl + '/frete/'+ id , frete);
  }

  getFreigthByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/frete/'+ id, id);
  }


 //Subcategorias 
 getSubcategoriesByID(id) :  Observable<any>{
    console.log(id)
    return this.http.get(this.apiUrl + '/subcategorias/'+ id, id);
  }

  //CRUD DE Imagens Destaque
  getHighlights(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/imagensdestaque', data);
  }

  createHighlight(category) :  Observable<any>{
    return this.http.post(this.apiUrl + '/imagensdestaque/0', category);
  }

  updateHighlights(id, category) :  Observable<any>{
    return this.http.put(this.apiUrl + '/imagensdestaque/'+ id , category);
  }

  deleteHighlights(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/imagensdestaque/' + id, id);
  }

  getHighlightsByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/imagensdestaque/'+ id, id);
  }


   //CRUD DE Pagamentos
   getPayments(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/pagamentos', data);
  }

  createPayment(payment) :  Observable<any>{
    return this.http.post(this.apiUrl + '/pagamentos/0', payment);
  }

  updatePayment(id, payment) :  Observable<any>{
    return this.http.put(this.apiUrl + '/pagamentos/'+ id , payment);
  }

  deletePayment(id) :  Observable<any>{
    return this.http.delete(this.apiUrl + '/pagamentos/' + id, id);
  }

  getPaymentByID(id) :  Observable<any>{
    return this.http.get(this.apiUrl + '/pagamentos/'+ id, id);
  }

  //Vendas

  getSales(data) : Observable<any>{
    return this.http.post(this.apiUrl + '/vendas', data);
  }

  getSaleId(data) : Observable<any>{
    return this.http.get(this.apiUrl + '/vendas/' + data, data);
  }

  changeStatusDelivery(data) : Observable<any>{
    return this.http.get(this.apiUrl + '/entrega/' + data, data);
  }
  
  changeStatusPayment(data) : Observable<any>{
    return this.http.get(this.apiUrl + '/pagamento/' + data, data);
  }

  cancelPayment(data) : Observable<any>{
    return this.http.get(this.apiUrl + '/cancelamento/' + data, data);
  }
}
