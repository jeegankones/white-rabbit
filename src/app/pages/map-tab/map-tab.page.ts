import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/interfaces/location';
import { DocumentSnapshot } from '@angular/fire/compat/firestore';
import { User } from '../../shared/interfaces/user';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'wr-map-page',
  templateUrl: 'map-tab.page.html',
  styleUrls: ['map-tab.page.scss']
})
export class MapTabPage implements OnInit, ViewWillEnter, AfterViewInit {
  readonly defaultOptions: google.maps.MapOptions = {
    center: {lat: 44.9695, lng: -93.276},
    zoom: 13
  };

  locations: Location[];
  mapConfig: google.maps.MapOptions;
  userDoc: DocumentSnapshot<User>;
  options = this.defaultOptions;

  constructor(private locationService: LocationService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.locations = data.locations;
      this.userDoc = data.user;
    });
  }

  ngAfterViewInit() {
    this.locationService.getLocationCollection().subscribe((locations) => {
      this.locations = locations;
    });
  }

  ionViewWillEnter() {
    this.checkFavoriteStatus();
  }

  checkFavoriteStatus() {
    const favoriteLocationId = this.userDoc.get('favoriteLocationId');
    if (favoriteLocationId) {
      const favLocation = this.locations.filter((location) => location.id === favoriteLocationId).pop();
      this.options = {...this.defaultOptions, center: favLocation.coordinates};
    } else {
      this.options = this.defaultOptions;
    }
  }

}
