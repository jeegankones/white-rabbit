import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/interfaces/location';
import { MapPoint } from '../../shared/interfaces/map-point';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'wr-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  location: Location;
  mapPoints: MapPoint[];
  isFavorited = false;

  constructor(private activatedRoute: ActivatedRoute, public locationService: LocationService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.location = data.location;
      this.mapPoints = [{
        id: this.location.id,
        location: new google.maps.LatLng(this.location.coordinates),
        weight: this.location.connectedUsers
      }];
    });
  }

}
