import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgError = ''

  constructor(private authServ:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    let data = form.value
    this.authServ.login(data.email, data.password).then((user) => {
      this.router.navigate(['/'])
      localStorage.setItem("userID", JSON.stringify(user.user?.uid))
    }).catch(() => {
      this.msgError = "Incorrect Email or Password"
    })
  }
}
