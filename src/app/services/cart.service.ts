import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { distinct, Observable, of, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCountSubject: Subject<number> = new Subject<number>();
  cartCount$: Observable<number> = this.cartCountSubject.asObservable(); 

  constructor() { }

  add(product: Product) : void {
    let products = this.getProducts();
    products.push(product);
    sessionStorage.setItem('cartItems', JSON.stringify(products));
    this.cartCountSubject.next(this.count());
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

  removeItem(id: string): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.getProducts().filter(e => e.id != id)));
    this.cartCountSubject.next(this.count());
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
