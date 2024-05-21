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
  url = "https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"

  constructor(private http: HttpClient) { }


  createProduct(product: any) {
    return this.http.post(this.url, product)
  }

  getProduct() {
    return this.http.get<{ [key: string]: Products }>(this.url)
      .pipe(
        map(res => {
          let products = [];
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
        })
      );
  }

  getProductbyId(id: number){
    return this.http.get('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/products/'+id+'.json')
  }


  updateProduct(id:string, product:Products){
    return this.http.put('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/products/'+id+'.json',product)
   }


   deleteProduct(id:string){  
    return this.http.delete('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/products/'+id+'.json')

  }














}
