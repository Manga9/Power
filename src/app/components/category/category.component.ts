import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ProductService } from 'src/app/services/products/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  getCategories?: Subscription
  allCategories: any = []
  getTopProducts?: Subscription
  topProducts: any = []
  allProducts: any = []
  getCategoryName?: Subscription
  categoryName: any
  getCategoryID?: Subscription
  categoryID: any

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getCategoryName = this.route.paramMap.subscribe(param => {
      this.categoryName = param.get('name')
    })

    this.getCategoryID = this.route.paramMap.subscribe(param => {
      this.categoryID = param.get('id')
    })

    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.allCategories = result
    })

    this.getTopProducts = this.proServ.getAllProducts().subscribe(result => {
      result.forEach(element => {
        if(this.topProducts.length < 4) {
          this.topProducts.push(element)
        }
        this.allProducts = result
      });
    })
  }

  ngOnDestroy(): void {
    this.getCategories?.unsubscribe()
    this.getCategoryName?.unsubscribe()
    this.getCategoryID?.unsubscribe()
    this.getTopProducts?.unsubscribe()
  }

}
