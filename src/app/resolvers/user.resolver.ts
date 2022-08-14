import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private afStore: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.user.pipe(
      switchMap((user) => this.afStore.doc<User>(`/users/${user.uid}`).get())
    );
  }
}
