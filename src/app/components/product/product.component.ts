import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  proID: any
  getProID?: Subscription
  product: any = []
  allCategories: any = []
  getCategories?: Subscription
  allProducts: any = []
  getAllProducts?: Subscription
  getProduct?: Subscription

  constructor(private proServ: ProductService, private route: ActivatedRoute, private catServ:CategoryService) { }

  ngOnInit(): void {
    this.getProID = this.route.paramMap.subscribe(result => {
      this.proID = result.get('id')
      this.getProduct = this.proServ.getProduct(this.proID).subscribe(pro => {
        this.product = pro
      })
    })



    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.allCategories = result
    })

    this.getAllProducts = this.proServ.getAllProducts().subscribe(result => {
      this.allProducts = result
    })
  }

  ngOnDestroy(): void {
    this.getProID?.unsubscribe()
    this.getCategories?.unsubscribe()
    this.getProduct?.unsubscribe
    this.getAllProducts?.unsubscribe()
  }

}
