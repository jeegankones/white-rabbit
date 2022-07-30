import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | any = null;

  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private loadingController: LoadingController,
              private router: Router,
              private alertController: AlertController) {
  }

  getCurrentUserData(): Observable<any | null> {
    return this.afAuth.authState.pipe(
      concatMap((authUser) => {
        if (authUser) {
          this.currentUser = {
            uid: authUser.uid,
            email: authUser.email,
          };
          return this.afStore.doc<any>(`/users/${authUser.uid}`)
            .get().pipe(
              catchError((error) => {
                throw new Error(error.message);
              }),
              map((userDoc) => {
                if (userDoc.data()) {
                  this.currentUser = {...this.currentUser, ...userDoc.data()};
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

  getUserDataByCredential(user: any): Promise<any> {
    return this.afStore.doc<any>(`/users/${user.uid}`).get().toPromise().then((userDoc) => {
      if (userDoc.data()) {
        this.currentUser = {...this.currentUser, ...userDoc.data()};
      }
      return this.currentUser;
    });
  }

  async signIn({ email, password }): Promise<boolean> {
    const loading = await this.loadingController.create();
    await loading.present();

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        await this.getUserDataByCredential(userCredential.user);
        await loading.dismiss();
        await this.router.navigateByUrl('/', { replaceUrl: true });
        return true;
      })
      .catch(async (error) => {
        await loading.dismiss();
        throw new Error(error);
      });
  }

  async signOut(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    return this.afAuth.signOut()
      .then(async () => {
        await loading.dismiss();
        await this.router.navigateByUrl('/login');
      })
      .catch(async (error) => {
        await loading.dismiss();
        throw new Error(error);
      });
  }
}
