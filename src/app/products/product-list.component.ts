import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { ListViewEventData } from 'nativescript-ui-listview'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { ObservableArray } from '@nativescript/core'

import { Product } from './shared/product.model'
import { ProductService } from './shared/product.service'

@Component({
  selector: 'ProductList',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _isLoading: boolean = false
  private _products: ObservableArray<Product> = new ObservableArray<Product>([])
  private _dataSubscription: Subscription

  constructor(private _productService: ProductService, private _routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    if (!this._dataSubscription) {
      this._isLoading = true

      this._dataSubscription = this._productService
        .load()
        .pipe(finalize(() => (this._isLoading = false)))
        .subscribe((products: Array<Product>) => {
          this._products = new ObservableArray(products)
          this._isLoading = false
        })
    }
  }

  ngOnDestroy(): void {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe()
      this._dataSubscription = null
    }
  }

  get products(): ObservableArray<Product> {
    return this._products
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  onProductItemTap(args: ListViewEventData): void {
    const tappedProductItem = args.view.bindingContext

    this._routerExtensions.navigate(['/products/product-detail', tappedProductItem.id], {
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}
