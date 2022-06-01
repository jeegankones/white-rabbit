import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'wr-map-page',
  templateUrl: 'map-tab.page.html',
  styleUrls: ['map-tab.page.scss']
})
export class MapTabPage implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    // eslint-disable-next-line max-len
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.ANGULAR_GOOGLE_MAPS_API_KEY}&libraries=visualization`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

}
