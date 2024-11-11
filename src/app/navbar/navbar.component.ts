import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount : number = 0;
  constructor(private cartService : CartService) { 
    
  }

  ngOnInit(): void {
    this.cartCount = this.cartService.count();
    this.cartService.productAdded$.subscribe(() => this.cartCount = this.cartService.count());

    this.cartService.view();
  }
}
