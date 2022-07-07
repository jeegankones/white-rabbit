import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared/interfaces/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concatMap, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null | undefined;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
  }

  fetchUserData(): Observable<User | null> {
    return this.afAuth.authState.pipe(concatMap((authUser) => {
      if (authUser) {
        this.currentUser = authUser;
        return this.afStore.doc<User>(`/users/${authUser.uid}`)
          .valueChanges()
          .pipe(
            take(1),
            map((userDoc) => {
              if (userDoc) {
                this.currentUser = {...this.currentUser, ...userDoc};
              }
              return this.currentUser;
            })
          );
      } else {
        this.currentUser = null;
        return of(this.currentUser);
      }
    }));
  }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
