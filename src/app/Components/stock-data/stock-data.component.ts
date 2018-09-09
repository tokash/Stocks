import { Component, OnInit, AfterViewInit } from '@angular/core';

import { WeatherService } from '../../Services/weather.service';
import {Chart} from 'chart.js'
import { StockDataServiceService } from '../../Services/stock-data-service.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.css']
})
export class StockDataComponent implements OnInit {
  chart = [];
  paramStockName = '';

  constructor(private _route: ActivatedRoute,
              private _weather: WeatherService,
              private _stockData: StockDataServiceService) { }

  // OnInit,
  ngOnInit() {
    
    this._route.queryParams.subscribe(params => {this.paramStockName = params['stock_name']}) //['stock_name']
    //console.log(this.paramStockName)
     this._stockData.getStockData(this.paramStockName)
      .subscribe(res => {
        console.log(res)
     })

    this._weather.dailyForecast()
    .subscribe(res => {
      //console.log(res)

      let temp = res['list'].map(res => res.main.temp)
      // let temp_max = res['list'].map(res => res.main.temp_max)
      // let temp_min = res['list'].map(res => res.main.temp_min)
      let pressure = res['list'].map(res => res.main.pressure)
      let allDates = res['list'].map(res => res.dt)

      // console.log(temp)
      // console.log(temp_max)
      // console.log(temp_min)
      // console.log(pressure)

      let weatherDates = []
      allDates.forEach((res) => {
        let jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}))
      });

      //console.log(weatherDates);
      let chart = new Chart('canvas', {
        type: 'line',
        data  : {
          labels: weatherDates,
          datasets: [
            {
              label: "Average Temp.",
              data: temp,
              borderColor: '#3cbb9f',
              fill: 'false'
            },
            {
              label: "Pressure",
              data: pressure,
              borderColor: '#ccff00',
              fill: 'false'
            },
          ],
          options:{
            responsive: true,
            // legend: {
            //   display: false,
            // },
            title: {
              display: true,
              position: "top",
              text: "Moscow Temp. & Pressure",
            },
            // tooltips: {
            //   mode: 'index',
            //   intersect: true,
            // },
            // hover: {
            //   mode: 'nearest',
            //   intersect: true
            // },
            // scales: {
            //   xAxes: [{
            //     display: true,
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'Month'
            //     }
            //   }],
            //   yAxes: [{
            //     display: true,
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'Value'
            //     }
            //   }]
            // }
          }
        }
      });

    })
  }

}
