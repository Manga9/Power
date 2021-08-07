import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authServ: AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {
    return new Promise(resolve => {
      this.authServ.user.subscribe(user => {
        if(user) {
          resolve(true)
        } else {
          this.router.navigate(['/login'])
          resolve(false)
        }
      })
    })
  }
}
