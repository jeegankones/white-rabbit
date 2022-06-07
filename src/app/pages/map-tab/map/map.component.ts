import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  readonly svgMarker: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'white',
    fillOpacity: 0,
    strokeWeight: 0,
    scale: 30,
  };
  mapPoints;

  constructor(private mapService: LocationService, private router: Router) { }

  ngOnInit() {
    this.mapService.getLocationCollection().subscribe((locations) => {
      this.mapPoints = locations.map(location => ({
        id: location.id,
        location: new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude),
        weight: (location.connectedUsers + 1) * 10,
      }));
    });
  }

  openLocation(location): void {
    this.router.navigate(['map', 'location', location.id]);
  }

}
