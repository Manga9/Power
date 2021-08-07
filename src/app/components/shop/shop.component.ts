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
  userID: string = ''

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.userID = JSON.parse(localStorage.getItem("userID") as string)

    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.allCategories = result
    })

    this.getTopProducts = this.proServ.getAllProducts().subscribe(result => {
      result.map(element => {
        if(this.topProducts.length < 4) {
          this.topProducts.push(element.payload.doc.data())
        }
        this.allProducts = result.map(element => {
          return element.payload.doc.data()
        })
      });
    })
  }

  ngOnDestroy(): void {
    this.getCategories?.unsubscribe()
    this.getTopProducts?.unsubscribe()
  }
}
