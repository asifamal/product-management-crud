import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentProduct:any;
  currentProductID:any

  constructor(private http: HttpClient) { }


  createProduct( url: string, product: any) {
    return this.http.post("http://127.0.0.1:8000/products/", product)
  }

  getProduct() {
    return this.http.get<{ [key: string]: Products }>("http://127.0.0.1:8000/products/")
      .pipe(
        map(res => {
          let products = [];
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key] });
            }
          }
          return products;
        })
      );
  }

  getProductbyId(id: number){
    return this.http.get(`http://127.0.0.1:8000/products/${id}/`)
  }


  updateProduct(id:string, product:Products){
    return this.http.put(`http://127.0.0.1:8000/products/${id}/`,product)
   }


   deleteProduct(id:string){  
    return this.http.delete(`http://127.0.0.1:8000/products/${id}/`)

  }














}
