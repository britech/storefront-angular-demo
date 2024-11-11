import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Cart = {} as Cart;
  columns: string[] = ['image', 'name', 'quantity', 'price', 'action'];

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.view();
  }

  removeFromCart(id: string): void {
    this.cartService.removeItem(id);
    this.cart = this.cartService.view();
  }
}
