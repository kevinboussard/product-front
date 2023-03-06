import { NgModule } from "@angular/core";
import { ProductsAdminComponent } from "./admin/products-admin/products-admin.component";
import { ProductsComponent } from "./products.component";
import { SharedModule } from "../shared/shared.module";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
  declarations: [ProductsAdminComponent, ProductsComponent],
  exports: [],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
