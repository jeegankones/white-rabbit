import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wr-map-page',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    // eslint-disable-next-line max-len
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCEFNQEy-pRnQSZ3jHhrzi2c-h6UlISKnY&libraries=visualization`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

}
