import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  userID: string = ""

  dataProfile:any= {
    Name: '',
    Bio: '',
    uid: '',
    Email: '',
    Image: ''
  }

  updatedSuccessfully:string = ''
  ID: string = ''
  @ViewChild('closeButton') closeButton: any
  @ViewChild('closeProButton') closeProButton: any
  @ViewChild('closeUpButton') closeUpButton: any

  task?: AngularFireUploadTask
  ref?: AngularFireStorageReference
  percentage?: Observable<number | undefined>
  getUserId?: Subscription
  allProducts: any = []
  getAllProducts?: Subscription
  allCategories : any = []
  getCategories?: Subscription
  imgUrl: string = ''
  successMsg: string = ''
  getProducts?: Subscription
  product: any = []

  constructor(private authServ: AuthService, private afStore: AngularFirestore, private afStorage: AngularFireStorage, private proServ: ProductService, private catServ: CategoryService, private router:Router) {

    this.ID = JSON.parse(localStorage.getItem("userID") as string)

  }

  ngOnInit(): void {
    this.afStore.collection("users").ref.doc(this.ID).get().then((data) => {
      this.dataProfile = data.data()
    })

    this.getAllProducts = this.proServ.getAllProducts().subscribe(result => {
      this.allProducts = result.map(element => {
        return element.payload.doc.data()
      })
    })

    this.getCategories = this.catServ.getAllCategories().subscribe(data=> {
      this.allCategories = data
    })
  }

  update() {
    this.afStore.collection("users").doc(this.dataProfile.uid).update({
      Name: this.dataProfile.Name,
    }).then(() => {
      this.updatedSuccessfully = "Your Profile Updated Successfully";
      this.closeButton.nativeElement.click()
      window.location.reload()
    })
  }

  uploadUserImage(event: any) {
    this.afStore.collection("users").ref.doc(this.dataProfile.uid).get().then((data) => {
      data.data()
    })
    const id = Math.random().toString(36).substr(2, 9);
    this.ref = this.afStorage.ref(id + '_' + event.target.files[0].name)
    this.task = this.ref.put(event.target.files[0])
    this.percentage = this.task.percentageChanges()
    this.task.then((data)=> {
      data.ref.getDownloadURL().then((url) => {
        this.afStore.collection("users").doc(this.dataProfile.uid).update({
          Image: url
        })
      })
    })
  }

  selectProduct(id:string) {
    this.proServ.getProduct(id).then(data => {
      this.product = data.data()
    })
  }

  uploadImage(event: any) {
    const id = Math.random().toString(36).substr(2, 9);
    this.ref = this.afStorage.ref(id + '_' + event.target.files[0].name)
    this.task = this.ref.put(event.target.files[0])
    this.percentage = this.task.percentageChanges()
    this.task.then((data)=> {
      data.ref.getDownloadURL().then((url) => {
        this.imgUrl = url
      })
    })
  }

  addNewProduct(form: NgForm) {
    let data = form.value
    this.afStore.collection("products").add({
      Name: data.Name,
      Bio: data.Bio,
      Price: data.Price,
      userID: this.dataProfile.uid,
      catID: data.categoryId,
      Image: this.imgUrl,
      proID: Math.random().toString(36).substr(2, 9)
    }).then(() => {
      this.router.navigate(['/products'])
      form.reset()
      this.closeProButton.nativeElement.click()
      this.successMsg = "Product is Added Successfully"
  })

  this.getProducts = this.proServ.getAllProducts().subscribe((data) => {
    data.map(element => {
      this.afStore.collection("products").doc(element.payload.doc.id).update({
        proID: element.payload.doc.id
      })
    })
  })
  }

  updateProduct(updateData: NgForm) {
    let data = updateData.value
    console.log(data)
    if (data.Image != "") {
      this.afStore.collection("products").doc(data.ID).update({
        Image: this.imgUrl
      })
    }
    this.afStore.collection("products").doc(data.ID).update({
      Name: data.Name,
      Bio: data.Bio,
      Price: data.Price,
      catID: data.categoryId,
    }).then(() => {
      this.closeUpButton.nativeElement.click()
      this.successMsg = "Product is Updated Successfully"
    })
  }

  deleteProduct(id:string) {
    this.proServ.deleteProduct(id).then(() => {
      this.successMsg = "Product Deleted Successfully"
    })
  }

  ngOnDestroy():void {
    this.getUserId?.unsubscribe();
    this.getAllProducts?.unsubscribe();
    this.getCategories?.unsubscribe();
    this.getProducts?.unsubscribe()
  }
}
