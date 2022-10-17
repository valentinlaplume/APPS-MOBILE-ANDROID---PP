import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// export class PasajeSplashGuard implements CanDeactivate {
//   constructor(public authService: AuthService){
//   }

//   canDeactivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     console.log('PasajeSplashGuard')
//     return this.authService.pasoPorSplash == false;
//   }

  
// }
export class PasajeSplash  implements CanDeactivate<boolean>{
  constructor(public authService: AuthService,
    public router: Router){}
  canDeactivate(): boolean {
    console.log('PasajeSplashGuard')
    return this.authService.pasoPorSplash == false;
  }
}
