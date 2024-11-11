import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { distinct, Observable, of, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsSubject: Subject<Product> = new Subject<Product>();
  productAdded$ : Observable<Product> = this.productsSubject.asObservable();

  constructor() { }

  add(product: Product) : void {
    let products = this.getProducts();
    products.push(product);
    sessionStorage.setItem('cartItems', JSON.stringify(products));
    this.productsSubject.next(product);
  }

  count(): number {
    return this.getProducts().length;
  }

  view(): Cart {
    let products = this.getProducts();
    let cart = new Cart();
    cart.items = Array.from(new Set(products.map(e => e.id).sort()))
    .map((e, index) => {
      let item = new CartItem();
      item.id = index + 1;
      item.product = products.find(x => x.id == e);
      item.quantity = products.filter(x => x.id == e).length;
      return item;
    });
    return cart;
  }

  private getProducts(): Product[] {
    let products: Product[] = [];
    let storage: any = sessionStorage.getItem('cartItems');
    if (storage) {
      products = JSON.parse(storage);
    }

    return products;
  }
}
