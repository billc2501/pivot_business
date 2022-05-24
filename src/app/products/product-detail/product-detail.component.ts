import { Component, OnInit } from '@angular/core'
import { PageRoute, RouterExtensions } from '@nativescript/angular'
import { switchMap } from 'rxjs/operators'

import { Product } from '../shared/product.model'
import { ProductService } from '../shared/product.service'

/* ***********************************************************
 * This is the item details component in the master-detail structure.
 * This component retrieves the passed parameter from the master list component,
 * finds the data item by this parameter and displays the detailed data item information.
 *************************************************************/
@Component({
  selector: 'ProductDetail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  private _product: Product

  constructor(
    private _productService: ProductService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  /* ***********************************************************
   * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
   * Get the data item details from the data service using this id and assign it to the
   * private property that holds it inside the component.
   *************************************************************/
  ngOnInit(): void {
    /* ***********************************************************
     * Learn more about how to get navigation parameters in this documentation article:
     * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
     *************************************************************/
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        const productId = params.id

        this._product = this._productService.getProductById(productId)
      })
  }

  get product(): Product {
    return this._product
  }

  /* ***********************************************************
   * The back button is essential for a master-detail feature.
   *************************************************************/
  onBackButtonTap(): void {
    this._routerExtensions.backToPreviousPage()
  }

  /* ***********************************************************
   * The master-detail template comes with an example of an item edit page.
   * Check out the edit page in the /products/product-detail-edit folder.
   *************************************************************/
  onEditButtonTap(): void {
    this._routerExtensions.navigate(['/products/product-detail-edit', this._product.id], {
      animated: true,
      transition: {
        name: 'slideTop',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}
