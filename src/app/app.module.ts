import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StockDataModelComponent } from './stock-data-model/stock-data-model.component';
import { StockDataServiceService } from './Services/stock-data-service.service';
import { StocksNavbarComponent } from './Components/stocks-navbar/stocks-navbar.component';
import { StocksTableComponent } from './Components/stocks-table/stocks-table.component';
import { StockDataComponent } from './Components/stock-data/stock-data.component';
import { WeatherService } from './Services/weather.service';

@NgModule({
  declarations: [ 
    AppComponent,
    StockDataModelComponent,
    StocksNavbarComponent,
    StocksTableComponent,
    StockDataComponent,   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: StocksTableComponent
        },
        {
          path: 'stock-data', //:stock_name
          component: StockDataComponent
        },
        {
          path: '**',
          component: StocksTableComponent
        }
      ]
    )

  ],
  providers: [StockDataServiceService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
