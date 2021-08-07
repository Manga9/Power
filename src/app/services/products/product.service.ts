import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afStore:AngularFirestore) { }

  getAllProducts() {
    return this.afStore.collection("products").snapshotChanges()
  }

  getProduct(id: string) {
    return this.afStore.collection("products").ref.doc(id).get();
  }

  deleteProduct(id:string) {
    return this.afStore.collection("products").doc(id).delete()
  }
}
