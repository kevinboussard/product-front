import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  sortOptions: SelectItem[];
  products: Product[] = [];
  sortOrder: number;
  sortField: string;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((data: Product[]) => (this.products = data));
    this.sortOptions = [
      { label: "Price High to Low", value: "desc-price" },
      { label: "Price Low to High", value: "asc-price" },
    ];
  }
}
