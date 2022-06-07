import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Location } from '../shared/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private afStore: AngularFirestore) { }

  getLocationCollection(): Observable<Location[]> {
    return this.afStore.collection<Location>('locations').valueChanges({idField: 'id'});
  }

  getLocation(id: string): Observable<Location> {
    return this.afStore.doc<Location>(`locations/${id}`).valueChanges({idField: 'id'});
  }
}
