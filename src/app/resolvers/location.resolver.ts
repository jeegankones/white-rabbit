import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '../shared/interfaces/location';
import { LocationService } from '../services/location.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Location> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
    return this.locationService.getLocation(route.paramMap.get('id')).pipe(take(1));
  }
}
