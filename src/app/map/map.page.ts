import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  readonly svgMarker: google.maps.Symbol = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'white',
    fillOpacity: 0,
    strokeWeight: 0,
    scale: 25,
  };

  popOverVisible = false;
  mapPoints;

  constructor(private mapService: MapService, private router: Router) {
  }

  ngOnInit() {
    this.mapService.getMapData().subscribe(data => {
        this.mapPoints = data.map(location => ({
            id: location.id,
            location: new google.maps.LatLng(location.latitude, location.longitude),
            weight: (location.connectedUsers + 1) * 10,
          }));
      }
    );
  }

  openLocation(location): void {
    this.router.navigate(['map', 'location', location.id]);
  }

}
