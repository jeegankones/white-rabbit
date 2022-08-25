import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { Location } from '../interfaces/location';

@Component({
  selector: 'wr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() locations: Location[];

  @Input() options?: google.maps.MapOptions;

  readonly svgMarker: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'white',
    fillOpacity: 0,
    strokeWeight: 0,
    scale: 30,
  };

  readonly defaultOptions: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    mapId: '556dce10fd536353',
    keyboardShortcuts: false
  };

  constructor(private mapService: LocationService, private router: Router) { }

  get weightedPoints(): google.maps.visualization.WeightedLocation[] {
    return this.locations.map(location => ({
      location: new google.maps.LatLng(location.coordinates),
      weight: (location.connectedUsers+1)*10
    }));
  }

  ngOnInit() {
    this.options = this.options === undefined ? this.defaultOptions : {...this.defaultOptions, ...this.options};
  }

  openLocation(location: Location): void {
    this.router.navigate(['tab', 'map', 'location', location.id]);
  }

}
