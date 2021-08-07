import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ProductService } from 'src/app/services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

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
  userID: string = ''
  isUser: boolean = false
  add: number = -1

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute, private authServ: AuthService, private cartServ:CartService) {
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

  
  addToCart(index:number) {
    this.add = +index
  }

  buy(amount:any) {
    let selectedPro = this.allProducts[this.add];
    let data = {
      name: selectedPro.Name,
      amount: amount,
      price: selectedPro.Price
    }
    this.cartServ.addToCart(data).then(() => this.add = -1)
  }

  ngOnDestroy(): void {
    this.getCategories?.unsubscribe()
    this.getCategoryName?.unsubscribe()
    this.getCategoryID?.unsubscribe()
    this.getTopProducts?.unsubscribe()
  }

}
