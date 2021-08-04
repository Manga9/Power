import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afStore: AngularFirestore) { }

  getAllCategories() {
    return this.afStore.collection("catgeories").valueChanges();
  }

  getCategory(id: string) {
    return this.afStore.collection("catgeories").ref.doc(id).get()
  }
}
