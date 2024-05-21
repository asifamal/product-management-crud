import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../models/products.model';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

  product: any

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router){}

  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id']
    this.fetchView(taskId)
  }

  fetchView(id:number){
    this.productService.getProductbyId(id).subscribe((res) => {
      this.product = res;
    })
  }

  goHome(){
    this.router.navigate(['home'])
  }


  }


