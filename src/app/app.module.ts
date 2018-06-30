import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockDataModelComponent } from './stock-data-model/stock-data-model.component';
import { StockDataServiceService } from './Services/stock-data-service.service';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    StockDataModelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [StockDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
