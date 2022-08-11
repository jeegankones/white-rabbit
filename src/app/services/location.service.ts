import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Location } from '../shared/interfaces/location';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiLoaded = false;

  constructor(private afStore: AngularFirestore, private httpClient: HttpClient) {
    // eslint-disable-next-line max-len
    this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.ANGULAR_GOOGLE_MAPS_API_KEY}&libraries=visualization`, 'callback')
      .subscribe(() => {
        this.apiLoaded = true;
      }, () => {
        this.apiLoaded = false;
      });
  }

  getLocationCollection(): Observable<Location[]> {
    return this.afStore.collection<Location>('locations').valueChanges({idField: 'id'});
  }

  getLocation(id: string): Observable<Location> {
    return this.afStore.doc<Location>(`locations/${id}`).valueChanges({idField: 'id'});
  }
}
