import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular'

import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component'
import { MyImageAddRemoveComponent } from './product-detail-edit/my-image-add-remove/my-image-add-remove.component'
import { MyListSelectorModalViewComponent } from './product-detail-edit/my-list-selector/my-list-selector-modal-view.component'
import { MyListSelectorComponent } from './product-detail-edit/my-list-selector/my-list-selector.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductListComponent } from './product-list.component'
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  imports: [
    ProductsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductDetailEditComponent,
    MyListSelectorComponent,
    MyListSelectorModalViewComponent,
    MyImageAddRemoveComponent,
  ],
  entryComponents: [MyListSelectorModalViewComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsModule {}
