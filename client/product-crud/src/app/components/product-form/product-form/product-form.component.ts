import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: ''
  }
  isEditMode = false

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router){
  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    if(id){
      this.isEditMode = true
      this.productService.get(id).subscribe({
        next: (data) => {
          this.product = data
        },
        error: (e) => console.error(e)
      })
    }
   }

   onSubmit():void{
    if(this.isEditMode){
this.productService.update(this.product.id!, this.product).subscribe({
  next: () => {
    this.router.navigate(['/products'])
  }, 
  error: (e) => console.error(e)
})
    } else{
      this.productService.create(this.product).subscribe({
        next: () => {
          this.router.navigate(['/products'])
        },
        error: (e) => console.error(e)
      })
    }
   }

   onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
    
      if (file.size > 1024 * 1024) {
        alert('File size should not exceed 1MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


}
