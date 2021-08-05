import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  getCategories?: Subscription
  allCategories: any = []
  getTopProducts?: Subscription
  topProducts: any = []
  allProducts: any = []

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

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
    this.getTopProducts?.unsubscribe()
  }
}
