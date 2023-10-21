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
    this.apiUrl = `${environment.ApiUrl}` + url.pathname
    console.log(this.apiUrl)
   }

  GetProducts() : Observable<any>{
    return this.http.get(this.apiUrl);
  }

  CreateProduct(product) :  Observable<any>{
    return this.http.put(this.apiUrl, product);
  }
  



  
}
