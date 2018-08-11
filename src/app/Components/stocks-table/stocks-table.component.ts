import { Component, OnInit } from '@angular/core';

import { StockDataServiceService } from '../../Services/stock-data-service.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit {

  columns = ["Name"];
  stocksData = [];

  constructor(private _stockDataService: StockDataServiceService) {
  }

  ngOnInit() {
    this._stockDataService.getCompanies()
    .subscribe(res => {
      this.stocksData = res;

      //console.log(res);
    });
  }

}
