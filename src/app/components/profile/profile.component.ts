import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  getobjet = JSON.parse(localStorage.getItem("userID") as string)
  @ViewChild('closeButton') closeButton: any
  task?: AngularFireUploadTask
  ref?: AngularFireStorageReference
  percentage?: Observable<number | undefined>
  getUserId?: Subscription

  constructor(private authServ: AuthService, private afStore: AngularFirestore, private afStorage: AngularFireStorage) {
    this.getUserId = this.authServ.user.subscribe(user => {
      this.userID = user.uid
    })

  }

  ngOnInit(): void {
    this.afStore.collection("users").ref.doc(this.getobjet).get().then((data) => {
      this.dataProfile = data.data()
    })
  }

  update() {
    this.afStore.collection("users").doc(this.dataProfile.uid).update({
      Name: this.dataProfile.Name,
      Bio: this.dataProfile.Bio
    }).then(() => {
      this.updatedSuccessfully = "Your Profile Updated Successfully";
      this.closeButton.nativeElement.click()
    })
  }

  uploadImage(event: any) {
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

  ngOnDestroy():void {
    this.getUserId?.unsubscribe();
  }
}
