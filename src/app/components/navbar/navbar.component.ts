import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  allCats: any = []
  getCats?: Subscription
  userID: string = ''
  dataProfile: any = []
  isUser: boolean = false
  cart: any = []

  constructor(private catServ: CategoryService, private afStore: AngularFirestore, private authServ: AuthService, private router:Router, private cartServ:CartService)
  {
    this.authServ.user.subscribe(user => {
      if(user) {
        this.isUser = true
        this.userID = JSON.parse(localStorage.getItem("userID") as string)
        this.afStore.collection("users").ref.doc(this.userID).get().then((data) => {
          this.dataProfile = data.data()
        })
        this.cartServ.getCart().subscribe(result => {
          this.cart = result.map(element => {
            return {
              id: element.payload.doc.id,
              ...(element.payload.doc.data() as object)
            }
          })
        })
      }else {
        this.isUser = false
      }
    })
  }

  ngOnInit(): void {
    this.getCats = this.catServ.getAllCategories().subscribe(result => {
      this.allCats = result
    })
  }

  logout() {
    this.authServ.logout().then(() => {
      this.router.navigate(['/login'])
      localStorage.removeItem("userID")
    }).catch(() => {
      console.log('error !')
    })
  }

}
