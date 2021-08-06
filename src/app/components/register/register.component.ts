import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  task?: AngularFireUploadTask
  ref?: AngularFireStorageReference
  imgUrl: string = ''

  constructor(private authServ:AuthService, private afStore: AngularFirestore, private router: Router, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  uploadImage(event: any) {
    const id = Math.random().toString(36).substr(2, 9);
    this.ref = this.afStorage.ref(id + '_' + event.target.files[0].name)
    this.task = this.ref.put(event.target.files[0])
    this.task.then((data)=> {
      data.ref.getDownloadURL().then((url) => {
        this.imgUrl = url
      })
    })
  }

  register(form: NgForm) {
    let data = form.value
    this.authServ.register(data.email, data.password).then((user) => {
      localStorage.setItem("userID", JSON.stringify(user.user?.uid))
      this.afStore.collection("users").doc(user.user?.uid).set({
        Name: data.name,
        Email: data.email,
        uid: user.user?.uid,
        Image: this.imgUrl,
      }).then(() => {
        this.router.navigate(['/'])
      })
    }).catch((e) => {
      console.log("error !", e)
    })
  }
}
