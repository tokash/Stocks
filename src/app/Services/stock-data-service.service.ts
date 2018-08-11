import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StockDataModelComponent } from '../stock-data-model/stock-data-model.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockDataServiceService {
  constructor(private _http: HttpClient) { }

  getStockData(company: string): Observable<any[]> {
    const res = this._http.get('http://localhost:3003/company/' + company);
    // console.log(res);

    return res.map(result => result as StockDataModelComponent[] || []);
    }

    getCompanies(): Observable<any[]> {
      const res = this._http.get('http://localhost:3003/companies/20');
      //console.log(res);
  
      return res.map(result => result as String[] || []);
      }
}
