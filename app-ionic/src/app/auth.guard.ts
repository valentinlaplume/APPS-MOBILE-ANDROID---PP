import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

import  {  take, map   } from  'rxjs/operators' ;


// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {
//   constructor(
//     private authSvc: AuthService,
//     private router: Router) {
//     }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot)
//     : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     return this.authSvc.user$.pipe(
//       take(1),
//       map((user) => {
//         console.log('user -> ', user);

//         if(user){ return true; }
        
//         this.router.navigate(['../app/login']);
//         return false;
//       })
//     );

//   }
  
// }


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSvc: AuthService, 
    private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(take(1), map((user) => {
        console.log('AuthGuard');
        if (user) {
          //if(!user.emailVerified) { this.router.navigate(['./verify-email']); }

          return true;
        } else {
          this.router.navigate(['./login']);
          return false;
        }
      })
    );
  }
}