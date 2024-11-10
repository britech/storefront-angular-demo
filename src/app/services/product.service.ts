import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Observable<Product[]> = of();

  constructor(private httpClient: HttpClient) { 
    this.products = httpClient.get<Product[]>(environment.endpoints.listProducts);

  }

  listProducts() : Observable<Product[]> {
    return this.products;
  }
}
