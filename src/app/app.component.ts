import { Component, OnInit } from '@angular/core';

import { StockDataServiceService } from './Services/stock-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  stockData = [];

  constructor(private _stockDataService: StockDataServiceService){

  }

  ngOnInit(){
    this._stockDataService.getStockData('024 PHARMA, INC.')
    .subscribe(res => {
      let stockData = res;

      //console.log(res);
    });
  }

}
