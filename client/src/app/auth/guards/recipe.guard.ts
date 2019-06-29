import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router,} from '@angular/router';
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthenticationService, private router: Router) {
  }


  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn();
  }
}
