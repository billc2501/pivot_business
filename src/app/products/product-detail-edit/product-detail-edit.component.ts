import { Component, OnInit } from '@angular/core'
import { PageRoute, RouterExtensions } from '@nativescript/angular'
import { switchMap } from 'rxjs/operators'
import { Dialogs } from '@nativescript/core'

import { ProductEditService } from '../shared/product-edit.service'
import { Product } from '../shared/product.model'
import { ProductService } from '../shared/product.service'
import { productClassList, productDoorList, productSeatList, productTransmissionList } from './constants'

@Component({
  selector: 'ProductDetailEdit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.scss'],
})
export class ProductDetailEditComponent implements OnInit {
  private _product: Product
  private _productClassOptions: Array<string> = []
  private _productDoorOptions: Array<number> = []
  private _productSeatOptions: Array<string> = []
  private _productTransmissionOptions: Array<string> = []
  private _isProductImageDirty: boolean = false
  private _isUpdating: boolean = false

  constructor(
    private _productService: ProductService,
    private _productEditService: ProductEditService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.initializeEditOptions()

    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        const productId = params.id

        this._product = this._productEditService.startEdit(productId)
      })
  }

  get isUpdating(): boolean {
    return this._isUpdating
  }

  get product(): Product {
    return this._product
  }

  get pricePerDay(): number {
    return this._product.price
  }

  set pricePerDay(value: number) {
    // force iOS UISlider to work with discrete steps
    this._product.price = Math.round(value)
  }

  get luggageValue(): number {
    return this._product.luggage
  }

  set luggageValue(value: number) {
    // force iOS UISlider to work with discrete steps
    this._product.luggage = Math.round(value)
  }

  get productClassOptions(): Array<string> {
    return this._productClassOptions
  }

  get productDoorOptions(): Array<number> {
    return this._productDoorOptions
  }

  get productSeatOptions(): Array<string> {
    return this._productSeatOptions
  }

  get productTransmissionOptions(): Array<string> {
    return this._productTransmissionOptions
  }

  get productImageUrl(): string {
    return this._product.imageUrl
  }

  set productImageUrl(value: string) {
    this._product.imageUrl = value
    this._isProductImageDirty = true
  }

  onCancelButtonTap(): void {
    this._routerExtensions.backToPreviousPage()
  }

  onDoneButtonTap(): void {
    /* ***********************************************************
     * By design this app is set up to work with read-only sample data.
     * Follow the steps in the "Firebase database setup" section in app/readme.md file
     * and uncomment the code block below to make it editable.
     *************************************************************/

    /* ***********************************************************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isProductImageDirty && this._product.imageUrl) {
            queue = queue
                .then(() => this._productService.uploadImage(this._product.imageStoragePath, this._product.imageUrl))
                .then((uploadedFile: any) => {
                    this._product.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._productService.update(this._product))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/products"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                Dialogs.alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/

    /* ***********************************************************
     * Comment out the code block below if you made the app editable.
     *************************************************************/
    const readOnlyMessage =
      'Check out the "Firebase database setup" section in the readme file to make it editable.'
    const queue = Promise.resolve()
    queue
      .then(() =>
        Dialogs.alert({
          title: 'Read-Only Template!',
          message: readOnlyMessage,
          okButtonText: 'Ok',
        })
      )
      .then(() =>
        this._routerExtensions.navigate(['/products'], {
          clearHistory: true,
          animated: true,
          transition: {
            name: 'slideBottom',
            duration: 200,
            curve: 'ease',
          },
        })
      )
  }

  private initializeEditOptions(): void {
    for (const classItem of productClassList) {
      this._productClassOptions.push(classItem)
    }

    for (const doorItem of productDoorList) {
      this._productDoorOptions.push(doorItem)
    }

    for (const seatItem of productSeatList) {
      this._productSeatOptions.push(seatItem)
    }

    for (const transmissionItem of productTransmissionList) {
      this._productTransmissionOptions.push(transmissionItem)
    }
  }
}
