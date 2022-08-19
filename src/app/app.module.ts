import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './shared/error/error-handler';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const initializeGoogleMapApiFactory = (httpClient: HttpClient): () => Observable<boolean> => () => httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.ANGULAR_GOOGLE_MAPS_API_KEY}&libraries=visualization`, 'callback')
  .pipe(
    map(() => true),
    catchError(() => of(false))
  );

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp({
      apiKey: environment.ANGULAR_FIREBASE_API_KEY,
      authDomain: environment.ANGULAR_FIREBASE_AUTH_DOMAIN,
      projectId: environment.ANGULAR_FIREBASE_PROJECT_ID,
      storageBucket: environment.ANGULAR_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: environment.ANGULAR_FIREBASE_MESSAGING_SENDER_ID,
      appId: environment.ANGULAR_FIREBASE_APP_ID,
      measurementId: environment.ANGULAR_FIREBASE_MEASUREMENT_ID
    }),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGoogleMapApiFactory,
      deps: [HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
