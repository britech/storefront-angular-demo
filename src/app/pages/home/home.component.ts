import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  ds: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  productsObservable: Observable<Product[]> = of();

  private products: Product[] = [];

  constructor(private productService : ProductService,
    private cartService : CartService) {
  }

  ngOnInit(): void {
    this.productService.listProducts().subscribe(products => {
      this.products.push(...products);
      this.ds = new MatTableDataSource<Product>(this.products);
      this.ds.paginator = this.paginator;
      this.productsObservable = this.ds.connect();
    });
  }

  addToCart(product: Product) : void {
    this.cartService.add(product);
  }
}
