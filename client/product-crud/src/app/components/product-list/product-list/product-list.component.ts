import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) {
    
  }
  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void{
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data
      },
      error: (e) => console.error(e),
    })
  }

  deleteProduct(id: number): void {
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts()
        },
        error: (e) => console.error(e)
      })
    }
  }



}
