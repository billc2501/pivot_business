import { Injectable } from '@angular/core'

import { Product } from './product.model'
import { ProductService } from './product.service'

@Injectable({
  providedIn: 'root',
})
export class ProductEditService {
  private _editModel: Product

  constructor(private _productService: ProductService) {}

  startEdit(id: string): Product {
    this._editModel = null

    return this.getEditableProductById(id)
  }

  getEditableProductById(id: string): Product {
    if (!this._editModel || this._editModel.id !== id) {
      const product = this._productService.getProductById(id)

      // get fresh editable copy of product model
      this._editModel = new Product(product)
    }

    return this._editModel
  }
}
