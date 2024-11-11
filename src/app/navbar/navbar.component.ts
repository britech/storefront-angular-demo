import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount : number = 0;
  showLogout: boolean = false;

  constructor(private cartService : CartService,
    private authService : AuthService,
    private router : Router) { 
    
  }

  ngOnInit(): void {
    this.cartCount = this.cartService.count();
    this.cartService.productAdded$.subscribe(() => this.cartCount = this.cartService.count());

    this.showLogout = this.authService.isAuthenticated();
    this.authService.login$.subscribe(enabled => this.showLogout = enabled);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home')
  }
}
