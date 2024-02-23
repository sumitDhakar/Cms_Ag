import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvoicePayments } from '../entites/invoice-payments';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentsService {
 

  baseUrl=environment.hostUrl+'/admin/hr/invoicePayments';

  constructor(private httpClient:HttpClient) { }

  addInvoicePayments(goalList:InvoicePayments){
    return this.httpClient.post(`${this.baseUrl}/`,goalList);
 }
// update 
updateInvoicePayments(goalList:InvoicePayments){
  return this.httpClient.put(`${this.baseUrl}/`,goalList);

}
//delete InvoicePayments   
deleteInvoicePayments(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/delete/${deleteId}`);
}
// get InvoicePayments By Id
getInvoicePaymentsByID(goallistId:number){
  return this.httpClient.get(`${this.baseUrl}/${goallistId}`);
}


  // get All goalList
  getAllInvoicePayments(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }

 // get All goalList for adminDash
 getAllInvoicePaymentsByOrder(){
   return this.httpClient.get(`${this.baseUrl}/order`);
}
 // get InvoicePayments by status
 getInvoicePaymentsByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

  
}
