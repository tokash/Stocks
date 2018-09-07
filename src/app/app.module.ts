import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { StockDataModelComponent } from './stock-data-model/stock-data-model.component';
import { StockDataServiceService } from './Services/stock-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { StocksNavbarComponent } from './Components/stocks-navbar/stocks-navbar.component';
import { StocksTableComponent } from './Components/stocks-table/stocks-table.component';
import { StockDataComponent } from './Components/stock-data/stock-data.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDataModelComponent,
    StocksNavbarComponent,
    StocksTableComponent,
    StockDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: StocksTableComponent
        },
        {
          path: 'stock-data/:stock_name',
          component: StockDataComponent
        }

      ]
    )

  ],
  providers: [StockDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
