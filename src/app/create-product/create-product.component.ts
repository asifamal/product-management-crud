import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  constructor(private products: ProductService, private form:FormBuilder, private router: Router){}

  productForm! : FormGroup

  ngOnInit(): void {
    this.productForm = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })
  }


  onCreateProduct(data: {name:string, description:string, price: string}){
    if(this.productForm.valid){
      let url = "http://127.0.0.1:8000/products/"
      this.products.createProduct(url, data).subscribe((res) => {
        this.router.navigate(['home'])
      })
    }else{
      this.productForm.markAllAsTouched()
    }
  }

  goHome(){
    this.router.navigate(['home'])
  }

}
