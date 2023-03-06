import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "app/products/products.service";
import { Product } from "app/products/product.model";
import { AltenMessageService } from "app/shared/utils/message/alten-message-service";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnInit {
  cols: any[];
  products: Product[];
  first = 0;
  rows = 10;

  productDialog: boolean;
  selectedProducts: Product[];
  submitted: boolean;
  statuses: any[];
  categories: any[];

  productForm = this.fb.group({
    id: [0, Validators.required],
    code: ["", Validators.required],
    name: ["", Validators.required],
    description: ["", Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    inventoryStatus: ["", Validators.required],
    category: ["", Validators.required],
    image: [""],
    rating: [0],
  });

  constructor(
    private productService: ProductsService,
    private messageService: AltenMessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  get idControl() {
    return this.productForm.get("id");
  }
  get codeControl() {
    return this.productForm.get("code");
  }
  get nameControl() {
    return this.productForm.get("name");
  }
  get descriptionControl() {
    return this.productForm.get("description");
  }
  get priceControl() {
    return this.productForm.get("price");
  }
  get quantityControl() {
    return this.productForm.get("quantity");
  }
  get inventoryStatusControl() {
    return this.productForm.get("inventoryStatus");
  }
  get categoryControl() {
    return this.productForm.get("category");
  }
  get imageControl() {
    return this.productForm.get("image");
  }
  get ratingControl() {
    return this.productForm.get("rating");
  }

  ngOnInit(): void {
    this.refreshProductList();

    this.statuses = [
      { label: "INSTOCK", value: "instock" },
      { label: "LOWSTOCK", value: "lowstock" },
      { label: "OUTOFSTOCK", value: "outofstock" },
    ];

    this.categories = [
      { label: "Accessories", value: "Accessories" },
      { label: "Clothing", value: "Clothing" },
      { label: "Electronics", value: "Electronics" },
      { label: "Fitness", value: "Fitness" },
    ];
  }

  openNew() {
    this.productForm.reset();
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.idControl.setValue(product.id);
    this.codeControl.setValue(product.code);
    this.nameControl.setValue(product.name);
    this.descriptionControl.setValue(product.description);
    this.priceControl.setValue(product.price);
    this.quantityControl.setValue(product.quantity);
    this.inventoryStatusControl.setValue(product.inventoryStatus);
    this.categoryControl.setValue(product.category);
    this.imageControl.setValue(product.image);
    this.ratingControl.setValue(product.rating);

    this.productDialog = true;
  }

  refreshProductList(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (e) => {
        this.messageService.errorMessage(e.message);
      },
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected products?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.productService
          .deleteProducts(this.selectedProducts.map((product) => product.id))
          .subscribe({
            next: () => {
              this.refreshProductList();
              this.messageService.successMessage("Products Deleted");
            },
            error: (e) => {
              this.messageService.errorMessage(e.message);
            },
          });
      },
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + product.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.refreshProductList();
            this.messageService.successMessage("Product Deleted");
          },
          error: (e) => {
            this.messageService.errorMessage(e.message);
          },
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.productForm.markAllAsTouched();

    let productToSave: Product = this.productForm.value as Product;
    if (productToSave.name.trim()) {
      if (productToSave.id) {
        this.updateProduct(productToSave);
      } else {
        this.createProduct(productToSave);
      }

      this.productDialog = false;
      this.productForm.reset();
    }
  }

  private createProduct(productToSave: Product) {
    productToSave.id = null;
    productToSave.image = "product-placeholder.svg";
    this.productService.createProduct(productToSave).subscribe({
      next: (product: Product) => {
        this.messageService.successMessage(
          "Product " + product.code + " Created"
        );
        this.refreshProductList();
      },
      error: (e) => {
        this.messageService.errorMessage(e.message);
      },
    });
  }

  private updateProduct(productToSave: Product) {
    this.productService.updateProduct(productToSave).subscribe({
      next: (product: Product) => {
        this.messageService.successMessage(
          "Product " + product.code + " Updated"
        );
        this.refreshProductList();
      },
      error: (e) => {
        this.messageService.errorMessage(e.message);
      },
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
