import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-data-model',
  templateUrl: './stock-data-model.component.html',
  styleUrls: ['./stock-data-model.component.css']
})
export class StockDataModelComponent {
  tag: string;
  value: number;
  date: string;
  quarter: number;
}
