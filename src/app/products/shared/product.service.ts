import { Injectable, NgZone } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import ApiService  from "~/services/api.service";

import { Product } from './product.model'

const editableProperties = [
  'doors',
  'imageUrl',
  'luggage',
  'name',
  'price',
  'seats',
  'transmission',
  'class',
]

/* ***********************************************************
 * This is the master detail data service. It handles all the data operations
 * of retrieving and updating the data. In this case, it is connected to Firebase and
 * is using the {N} Firebase plugin. Learn more about it here:
 * https://github.com/EddyVerbruggen/nativescript-plugin-firebase
 * The {N} Firebase plugin needs some initialization steps before the app starts.
 * Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
 *************************************************************/
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private static cloneUpdateModel(product: Product): object {
    return editableProperties.reduce((a, e) => ((a[e] = product[e]), a), {})
  }

  private _products: Array<Product> = []

  constructor(private _ngZone: NgZone) {}

  getProductById(id: string): Product {
    if (!id) {
      return
    }

    return this._products.filter((product) => {
      return product.id === id
    })[0]
  }

  load(): Observable<any> {
    return new Observable((observer: any) => {
      const path = 'products'

      const onValueEvent = (snapshot: any) => {
        this._ngZone.run(() => {
          const results = this.handleSnapshot(snapshot)
          observer.next(results)
        })
      }
      ApiService.addValueEventListener(onValueEvent, `/${path}`)
    }).pipe(catchError(this.handleErrors))
  }

  update(productModel: Product): Promise<any> {
    const updateModel = ProductService.cloneUpdateModel(productModel)

    return ApiService.update('/products/' + productModel.id, updateModel)
  }

  uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
    return ApiService.uploadFile({
      localFullPath,
      remoteFullPath,
      onProgress: null,
    })
  }

  private handleSnapshot(data: any): Array<Product> {
    this._products = []

    if (data) {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          this._products.push(new Product(data[id]))
        }
      }
    }

    return this._products
  }

  private handleErrors(error: Response): Observable<never> {
    return throwError(error)
  }
}
