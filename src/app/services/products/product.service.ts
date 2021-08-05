import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afStore:AngularFirestore) { }

  getAllProducts() {
    return this.afStore.collection("products").valueChanges()
  }

  getProduct(id: string) {
    return this.afStore.collection("products").doc(id).valueChanges()
  }

}
