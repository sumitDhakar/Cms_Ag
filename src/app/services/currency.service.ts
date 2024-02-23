import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient:HttpClient) { }

  getAllCurrency(){
    return this.httpClient.get('https://www.wixapis.com/currency_converter/v1/currencies');
  }
}
