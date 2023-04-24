import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CryptoJsService } from '../Services/crypto-js/crypto-js.service';


@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {

  constructor(private cryptoJsService: CryptoJsService, private cookieService: CookieService, private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cookieService.get('user') != '') {
      let user = this.cryptoJsService.decrypt(this.cookieService.get('user'));
      if (user.role.key_value == 'admin') {
        return true
      }
    }


    return this.route.navigate(['login'])
  }

}
