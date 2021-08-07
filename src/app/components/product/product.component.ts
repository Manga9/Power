import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { CategoryService } from 'src/app/services/categories/category.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

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
  userID: string = ''
  isUser:boolean = false
  add: number = -1

  constructor(private proServ: ProductService, private route: ActivatedRoute, private catServ:CategoryService, private authServ: AuthService, private cartServ: CartService) {
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

    this.getProID = this.route.paramMap.subscribe(result => {
      this.proID = result.get('id')
      this.proServ.getProduct(this.proID).then(data => {
        this.product = data.data()
      })
    })



    this.getCategories = this.catServ.getAllCategories().subscribe(result => {
      this.allCategories = result
    })

    this.getAllProducts = this.proServ.getAllProducts().subscribe(result => {
      this.allProducts = result.map(element => {
        return element.payload.doc.data()
      })
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
    this.getProID?.unsubscribe()
    this.getCategories?.unsubscribe()
    this.getAllProducts?.unsubscribe()
  }

}
