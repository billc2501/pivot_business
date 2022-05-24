import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductListComponent } from './product-list.component'

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'product-detail-edit/:id', component: ProductDetailEditComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ProductsRoutingModule {}
