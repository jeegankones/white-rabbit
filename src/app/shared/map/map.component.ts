import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { MapPoint } from '../interfaces/map-point';

@Component({
  selector: 'wr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() mapPoints: MapPoint[];

  @Input() center: google.maps.LatLngLiteral = {lat: 44.9695, lng: -93.276};

  @Input() zoom = 13;

  readonly svgMarker: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'white',
    fillOpacity: 0,
    strokeWeight: 0,
    scale: 30,
  };

  constructor(private mapService: LocationService, private router: Router) { }

  ngOnInit() {

  }

  openLocation(location): void {
    this.router.navigate(['tab', 'map', 'location', location.id]);
  }

}
