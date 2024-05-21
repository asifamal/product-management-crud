import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { Products } from '../models/products.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(private form: FormBuilder, private product: ProductService, private route: Router){}

  productForm! :FormGroup
  productID!: any
  productArray: Products[] = []


  ngOnInit(): void {
    this.productForm = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price:['', Validators.required]
  })
  this.productForm.patchValue({
    name: this.product.currentProduct.name,
    description: this.product.currentProduct.description,
    price: this.product.currentProduct.price
  })
  }

  onUpdateProduct(productDataNew: {name:string,description: string, price: string}){
    if(this.productForm.valid){
      this.product.updateProduct(this.product.currentProductID,productDataNew)
      .subscribe((res) => {
        this.route.navigate(['/home'])
      })
    }else{
      this.productForm.markAllAsTouched()
    }
  }

  goHome(){
    this.route.navigate(['home'])
  }


}