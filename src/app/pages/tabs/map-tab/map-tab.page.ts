import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { MapPoint } from '../../../shared/interfaces/map-point';

@Component({
  selector: 'wr-map-page',
  templateUrl: 'map-tab.page.html',
  styleUrls: ['map-tab.page.scss']
})
export class MapTabPage implements OnInit {
  mapPoints: MapPoint[];

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getLocationCollection().subscribe((locations) => {
      this.mapPoints = locations.map(location => ({
        id: location.id,
        location: new google.maps.LatLng(location.coordinates),
        weight: (location.connectedUsers + 1) * 10,
      }));
    });
  }

}
