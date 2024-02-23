import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BankInformation } from '../entites/bank-information';

@Injectable({
  providedIn: 'root'
})
export class BankInformationService {
  baseUrl = environment.hostUrl + "/bankInformation"


  constructor(private httpClient: HttpClient) { }

  // add BankInformation
  addBankInformation(bankInformation:BankInformation,userId:number){
    return this.httpClient.post(`${this.baseUrl}/${userId}`,bankInformation);
    }

  // get BankInformations By Id
  getBankInformationById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }}

