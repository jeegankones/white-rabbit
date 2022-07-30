import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkOnboardingStatus();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkOnboardingStatus();
  }

  checkOnboardingStatus(): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.currentUser) {
      return this.authService.getCurrentUserData()
        .pipe(
          map((user) => user?.completedOnboarding ? true : this.router.parseUrl('/onboarding'))
        );
    }
    if (this.authService.currentUser?.completedOnboarding) {
      return true;
    }
    return this.router.parseUrl('/onboarding');
  }
}
