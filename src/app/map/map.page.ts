import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {
  readonly svgMarker: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'white',
    fillOpacity: 0,
    strokeWeight: 0,
    scale: 25,
  };

  popOverVisible = false;

  mapPoints = [
    {id: 1, location: new google.maps.LatLng(44.95, -93.29), weight: 100},
    {id: 2, location: new google.maps.LatLng(44.963, -93.292), weight: 80},
    {id: 3, location: new google.maps.LatLng(44.97, -93.27), weight: 10},
  ];

  constructor() {
  }

  openLocation($event, location): void {

  }

}
