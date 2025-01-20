import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'

  constructor(private http: HttpClientModule) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  get(id: number): Observable<Product[]>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  create(data: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, data)
  }

  update(id: number, data: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${id}`, data)
  }

  delete(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
