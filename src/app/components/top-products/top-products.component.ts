import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { CategoryService } from 'src/app/services/categories/category.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit, OnDestroy {

  topProducts: any = []
  getTopProducts?: Subscription
  categories: any = []
  getCategories?: Subscription
  userID: string = ''
  isUser:boolean = false

  constructor(private proServ:ProductService, private catServ: CategoryService, private authServ: AuthService) {
    this.authServ.user.subscribe(user => {
      if(user) {
        this.isUser = true
        this.userID = JSON.parse(localStorage.getItem("userID") as string)
      }else {
        this.isUser = false
      }
    })
  }

  ngOnInit(): void {
    
    this.getTopProducts = this.proServ.getAllProducts().subscribe(result => {
      result.map(element => {
        if(this.topProducts.length < 4) {
          this.topProducts.push(element.payload.doc.data())
        }
      })
    })

    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.categories = result
    })
  }

  ngOnDestroy(): void {
    this.getTopProducts?.unsubscribe()
    this.getCategories?.unsubscribe()
  }

}
