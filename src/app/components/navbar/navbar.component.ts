import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  allCats: any = []
  getCats?: Subscription
  userID: string = ''
  dataProfile: any = []

  constructor(private catServ: CategoryService, private afStore: AngularFirestore, private authServ: AuthService, private router:Router)
  {
      this.userID = JSON.parse(localStorage.getItem("userID") as string)
  }

  ngOnInit(): void {
    this.getCats = this.catServ.getAllCategories().subscribe(result => {
      this.allCats = result
    })
    this.afStore.collection("users").ref.doc(this.userID).get().then((data) => {
      this.dataProfile = data.data()
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


  ngOnDestroy(): void {
    this.getCats?.unsubscribe()
  }

}
