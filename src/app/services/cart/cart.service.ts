import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private afStroe: AngularFirestore, private authServ: AuthService) { }

  addToCart(data: {} ) {
    return this.afStroe.collection(`users/${this.authServ.userID}/cart`).add(data);
  }
  getCart() {
    return this.afStroe.collection(`users/${this.authServ.userID}/cart`).snapshotChanges()
  }

  delete(id: string) {
    return this.afStroe.doc(`users/${this.authServ.userID}/cart/${id}`).delete()
  }

  save(id: string, amount: number) {
    return this.afStroe.doc(`users/${this.authServ.userID}/cart/${id}`).update({
      amount
    })
  }
}
