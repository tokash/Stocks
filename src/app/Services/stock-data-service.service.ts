import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StockDataModelComponent } from '../stock-data-model/stock-data-model.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockDataServiceService {
  constructor(private _http: HttpClient) { }

  getStockData(company: string): Observable<any[]> {
    let headers = new HttpHeaders();
    let params = new HttpParams().set('something', 'hello');

    params = params.append('Company', company);

    const res = this._http.get('http://localhost:3003/company', {headers, params});
    console.log(res);

    return res.map(result => result as StockDataModelComponent[] || []);
    }

    getCompanies(): Observable<any[]> {
      const res = this._http.get('http://localhost:3003/companies/20');
      //console.log(res);
  
      return res.map(result => result as String[] || []);
      }
}
