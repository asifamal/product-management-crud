import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products.model';
import { ProductService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{
  productsFromService: Products[] = []


  constructor(private products: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.products.getProduct().subscribe((products) => {
      this.productsFromService = products;
  })
}

onUpdateClick(id?:string){
    let currentProduct = this.productsFromService.find((t) => {
      return t.id === id
    })
    this.products.currentProduct = currentProduct
    this.products.currentProductID = id
    this.router.navigate(['edit', id])
}


onDeleteClick(id: string | undefined) {
  if (id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.products.deleteProduct(id).subscribe((res) => {
          this.products.getProduct().subscribe((products) => {
            this.productsFromService = products;
          })
        })
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )

        this.router.navigate(['/home'])
      }
    })
  }
}



onViewClick(id: any){
  this.router.navigate(['view',id])
}









}
