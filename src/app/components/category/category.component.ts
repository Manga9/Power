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
  categoryName: any
  catID: any

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.categoryName = this.route.snapshot.paramMap.get('name')

    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.allCategories = result
      this.allCategories.forEach((element: { Name: string; catID: string; }) => {
        if(this.categoryName == element.Name) {
          this.catID = element.catID
        }
      });
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
  }

}
