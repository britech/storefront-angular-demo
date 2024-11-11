import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  product: Product = new Product();
  private categories: string[] = [];
  filteredCategories: string[] = [];

  constructor(private snackBar : MatSnackBar, 
    private router : Router,
    private productService : ProductService) {

  }
  
  ngOnInit(): void {
    this.productService.listCategories().subscribe(categories => this.categories.push(...categories));
    this.filteredCategories = this.categories;
  }

  onSubmit(form: NgForm) : void{
    if (form.invalid) {
      return;
    }
    
    this.productService.addProduct(this.product);
    this.router.navigateByUrl('/home');
    this.snackBar.open('Product Added', 'Dismiss');
  }

  updateCategories(searchString: string): void {
    this.filteredCategories = this.categories.filter(e => e.toLowerCase().includes(searchString));
  }
}
