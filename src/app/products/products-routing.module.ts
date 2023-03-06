import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsAdminComponent } from "./admin/products-admin/products-admin.component";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "admin/products", component: ProductsAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
