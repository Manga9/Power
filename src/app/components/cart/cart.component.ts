import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: any = []
  userID: string = ''
  user: any = []
  successMsg: string = ''

  constructor(private cartServ: CartService, private afStore: AngularFirestore, private router:Router) { 
    this.userID = JSON.parse(localStorage.getItem("userID") as string)
    this.afStore.collection('users').ref.doc(this.userID).get().then(result => {
      this.user = result.data()
    })
  }

  ngOnInit(): void {
    this.cartServ.getCart().subscribe(result => {
      this.cart = result.map(element => {
        return {
          id: element.payload.doc.id,
          ...(element.payload.doc.data() as object)
        }
      })
    })
  }

  delete(index: number) {
    this.cartServ.delete(this.cart[index].id)
  }

  save(index: number) {
    this.cartServ.save(this.cart[index].id, this.cart[index].amount)
  }

  getTotal() {
    let total: number = 0
    for (let index = 0; index < this.cart.length; index++) {
      var product = this.cart[index];
      total += (product.price * product.amount);
    }
    return total;
  }

  done() {
    this.router.navigate(['/done']);
    this.successMsg = "We request your order and we will dliever it to you as soon as possible"
  }

}
