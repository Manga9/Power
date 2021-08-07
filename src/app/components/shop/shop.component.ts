import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
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
  isUser:boolean = false
  add:number = -1

  constructor(private catServ: CategoryService, private proServ: ProductService, private route: ActivatedRoute, private authServ:AuthService, private cartServ: CartService) {
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
    this.getTopProducts?.unsubscribe()
  }
}
