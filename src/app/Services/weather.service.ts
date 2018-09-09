import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=daf55de1023892e04c8344420213a918')
    .map(result => result);
  }
}
