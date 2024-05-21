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
      image: [null,Validators.required]
    })
  }


  onCreateProduct(data: {title:string, description:string, price: string}){
    if(this.productForm.valid){
      this.products.createProduct(data).subscribe((res) => {
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
