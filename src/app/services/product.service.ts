import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor(private httpClient: HttpClient) { 
    
  }

  listProducts() : Observable<Product[]> {
    return concat(this.httpClient.get<Product[]>(environment.endpoints.listProducts), of([...this.products]));
  }
}
