import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, concatMap, distinct, from, map, Observable, of, reduce, tap } from 'rxjs';
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
    return concat(this.httpClient.get<Product[]>(environment.endpoints.listProducts), of([...this.getLocalProducts()]));
  }

  listCategories(): Observable<string[]> {
    return concat(this.httpClient.get<string[]>(environment.endpoints.listCategories), 
      of([...this.getDistinctCategoriesFromLocal()]));
  }

  addProduct(product : Product) : void {
    let products = this.getLocalProducts();
    product.id = self.crypto.randomUUID();
    products.push(product);
    sessionStorage.setItem('products', JSON.stringify(products));
  }
  
  private getDistinctCategoriesFromLocal(): string[] {
    return [...new Set(this.getLocalProducts().map(e => e.category ?? "").filter(e => e != ""))];
  }

  private getLocalProducts(): Product[] {
    try {
      let localProducts : Product[] = Object.assign([], JSON.parse(sessionStorage.getItem('products') ?? "[]"));
      return localProducts;
    } catch (err) {
      return [];
    }
  }
}
