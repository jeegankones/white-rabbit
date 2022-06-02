import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapTabService {
  private readonly url = 'https://morning-dusk-38693.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getMapData(): Observable<any> {
    return this.httpClient.get(this.url + '/mapjson');
  }
}
