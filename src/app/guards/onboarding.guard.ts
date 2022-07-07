import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.currentUser === undefined) {
      return this.authService.fetchUserData()
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
