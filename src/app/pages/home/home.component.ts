import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  ds: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  productsObservable: Observable<Product[]> = of();
  searchString: string = "";
  sortField: number = 0;

  private products: Product[] = [];

  constructor(private productService : ProductService,
    private cartService : CartService,
    private snackbar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.productService.listProducts().subscribe(products => {
      this.products.push(...products);
      this.ds = new MatTableDataSource<Product>([...this.products]);
      this.ds.filterPredicate = (data, filter) => {
        return (data.category?.toLowerCase()?.includes(filter) ?? false) || (data.title?.toLowerCase()?.includes(filter) ?? false)
      }
      this.ds.paginator = this.paginator;
      this.productsObservable = this.ds.connect();
    });
  }

  addToCart(product: Product) : void {
    this.cartService.add(product);
    this.snackbar.open(`${product.title} added to cart`, 'Dismiss', {
      duration: 1000
    })
  }

  applyFilter(): void {
    this.ds.filter = this.searchString.trim().toLowerCase();
  }

  resetFilter() {
    this.searchString = "";
    this.applyFilter();
  }

  resetSort(): void {
    this.sortField = 0;
    this.applySort();
  }

  applySort(): void {
    if (this.sortField == 1) {
      this.ds.data.sort((a, b) => {
        return (a.price ?? 0) - (b.price ?? 0);
      });
    } else if (this.sortField == 2) {
      this.ds.data.sort((a, b) => {
        return (b.price ?? 0) - (a.price ?? 0);
      });
    } else if (this.sortField == 3) {
      this.ds.data.sort((a, b) => {
        return a.title?.localeCompare(b?.title ?? "") ?? -1;
      });
    } else if (this.sortField == 4) {
      this.ds.data.sort((a, b) => {
        return (b.title ?? "").localeCompare(a.title ?? "") ?? -1;
      });
    } else {
      this.ds.data = [...this.products];
    }
    this.ds._updateChangeSubscription();
  }
}
