import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/interfaces/location';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'wr-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  location: Location;
  isFavorite = false;
  isFavoriteLoading = false;
  mapConfig: google.maps.MapOptions;
  userDoc: DocumentSnapshot<User>;

  constructor(private activatedRoute: ActivatedRoute, private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.location = data.location;
      this.userDoc = data.user;
      this.mapConfig = {
        center: this.location.coordinates,
        zoom: 15,
        gestureHandling: 'none'
      };
      this.isFavorite = this.userDoc.get('favoriteLocationId') === this.location.id;
    });
  }

  async setFavorite() {
    this.isFavoriteLoading = true;
    const user = await this.afAuth.currentUser;
    await this.afStore.doc(`/users/${user.uid}`).update({
      favoriteLocationId: this.isFavorite ? null : this.location.id
    });
    this.isFavorite = !this.isFavorite;
    this.isFavoriteLoading = false;
  }

}
