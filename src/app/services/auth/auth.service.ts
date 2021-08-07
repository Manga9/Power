import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>
  userID: any

  constructor(private afAuth:AngularFireAuth) {
    this.user = this.afAuth.user
    this.afAuth.user.subscribe(result => {
     this.userID=  result?.uid
    })
  }

  register(email:string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

}
