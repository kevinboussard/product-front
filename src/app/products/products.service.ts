import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("/products");
  }

  createProduct(productToSave: Product): Observable<Product> {
    return this.http.post<Product>("/products", productToSave);
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    return this.http.patch<Product>("/products", productToUpdate);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete("/products/" + id);
  }

  deleteProducts(ids: number[]): Observable<any> {
    return this.http.delete("/products", { body: ids });
  }
}
