import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<any> {
  constructor(private afAuth: AngularFireAuth) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.afAuth.user.pipe(
      map((user) => ({displayName: user.displayName, created: user.metadata.creationTime}))
    );
  }
}
