import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

import { WeatherService } from '../../Services/weather.service';
import {Chart} from 'chart.js'
import { StockDataServiceService } from '../../Services/stock-data-service.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { StockDataModelComponent } from '../../stock-data-model/stock-data-model.component';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.css']
})
export class StockDataComponent implements OnInit {
  chart = [];
  chartGrossProfit = [];
  paramStockName = '';
  stockData = [];
  stockDataByTag = [];
  modelStart;
  modelEnd;

  constructor(private _route: ActivatedRoute,
              private _weather: WeatherService,
              private _stockData: StockDataServiceService) { }

  // OnInit,
  ngOnInit() {
    
    this._route.queryParams.subscribe(params => {this.paramStockName = params['stock_name']}) //['stock_name']
    //console.log(this.paramStockName)
     this._stockData.getStockData(this.paramStockName)
      .subscribe(res => {
        this.stockData = res
        this.CreateTagArray('GrossProfit');
        this.CreateTagArray('NetIncomeLoss');

        let grossProfitData = this.GetDataArray('GrossProfit', this.stockDataByTag);
        let netIncomeLossData = this.GetDataArray('NetIncomeLoss', this.stockDataByTag);

        if(grossProfitData &&
           netIncomeLossData)
           {
            let grossProfitProcessedData = this.CreateArrayOfData(grossProfitData as any[])
            let netIncomeLossProcessedData = this.CreateArrayOfData(netIncomeLossData as any[])
    
            let chartGrossProfit = new Chart('canvasGrossProfit', {
              type: 'bar',
              data  : {
                labels: netIncomeLossProcessedData[1],
                datasets: [
                  {
                    label: 'Net Income',
                    data: netIncomeLossProcessedData[0],
                    borderColor: '#3cbb9f',
                    backgroundColor:'#3cbb9f',
                    fill: 'true'
                  },
                ],
              },
              options:{
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  display: true,
                  position: "top",
                  text: 'Net Income for ' + this.paramStockName,
                },
                tooltips: {
                  mode: 'index',
                  intersect: true,
                },
                hover: {
                  mode: 'nearest',
                  intersect: true
                },
              }
            });
           }
        

        // for (let quarterData of this.stockData ){
        //   //console.log(quarterData)
        //   for(let i in quarterData){
        //     console.log(quarterData[i])
        //   }
        // }
     })

     
    // this._weather.dailyForecast()
    // .subscribe(res => {
     
    //   let temp = res['list'].map(res => res.main.temp)
    //   // let temp_max = res['list'].map(res => res.main.temp_max)
    //   // let temp_min = res['list'].map(res => res.main.temp_min)
    //   let pressure = res['list'].map(res => res.main.pressure)
    //   let allDates = res['list'].map(res => res.dt)

    //   //console.log(temp)
    //   // console.log(temp_max)
    //   // console.log(temp_min)
    //   // console.log(pressure)

    //   let weatherDates = []
    //   allDates.forEach((res) => {
    //     let jsdate = new Date(res * 1000)
    //     weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}))
    //   });

    //   //console.log(weatherDates);
    //   let chart = new Chart('canvas', {
    //     type: 'line',
    //     data  : {
    //       labels: weatherDates,
    //       datasets: [
    //         {
    //           label: "Average Temp.",
    //           data: temp,
    //           borderColor: '#3cbb9f',
    //           fill: 'false'
    //         },
    //         {
    //           label: "Pressure",
    //           data: pressure,
    //           borderColor: '#ccff00',
    //           fill: 'false'
    //         },
    //       ],
    //     },
    //     options:{
    //       responsive: true,
    //       maintainAspectRatio: true,
    //       title: {
    //         display: true,
    //         position: "top",
    //         text: "Moscow Temp. & Pressure",
    //       },
    //       tooltips: {
    //         mode: 'index',
    //         intersect: true,
    //       },
    //       hover: {
    //         mode: 'nearest',
    //         intersect: true
    //       },
    //     }
    //   });
    // })
  }

  GetDataArray(tag: string, arr: any[]){
    //console.log(arr);

    if(arr != null)
    {
      for(let i in arr){
        let currArr = Object.values(arr[i])[1]
  
        //console.log(currArr);
        if(currArr)
        {
          if(currArr[0])
          {
            if(currArr[0].tag == tag){
              return currArr;
            }
          }
        }
      }
    }
    
  }

  CreateArrayOfData(arr: any[]){
    let data = [];
    let dates = [];

    if (arr != null){
      for(let i in arr){
        data.push(parseInt(arr[i].value));
        dates.push(arr[i].ddate);
      }  
    }
    
    // console.log(data)
    // console.log(dates)

    return [data.reverse(), dates.reverse()];
  }

  CreateTagArray(tag: string){
    let data = []

    if (this.stockData != null){
      //console.log(this.stockData)

      for(let i in this.stockData){
        let currArray = Object.values(this.stockData[i])[1]
        for(let j in currArray){
          if (!data.includes(currArray[j]))
          {
            data.push(currArray[j])
          }
        }
      }

      //This data should go into the graph
      let tagData = _.filter(data, function(o) { return o.tag == tag && o.quarter == 1; });
      tagData = _.uniqBy(tagData ,'ddate');

      if(tagData != null){
        if(!this.stockDataByTag.includes([tag, tagData]))
        {
          this.stockDataByTag.push([tag, tagData]);
        }
        
      }
      
      //console.log(tagData);    
    }
  }
  
}
