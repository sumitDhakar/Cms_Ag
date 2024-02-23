import { Injectable } from '@angular/core';
import { Invoice } from '../entites/invoice';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  baseUrl = environment.hostUrl + "/admin/hr/invoices"


  constructor(private httpClient: HttpClient) { }

  // adding 
   addInvoice(invoice:Invoice){
    return this.httpClient.post(`${this.baseUrl}/`,invoice);
    }


  // get all Invoice
  getAllInvoice(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }
  // get all Invoice By Order
  getAllInvoiceByOrder() {
    return this.httpClient.get(`${this.baseUrl}/order`);
  }

  // getInvoiceById
  getInvoiceById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

// update 
updateInvoice(invoice: Invoice){
  return this.httpClient.put(`${this.baseUrl}/`,invoice);

}

  // update expenses status
  updateInvoiceStatus( id: number,status: string,) {
    return this.httpClient.put(`${this.baseUrl}/status/${id}`, status);
  }
 

  
deleteInvoice(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/delete/${deleteId}`);
}


  // search Invoice
  searchInvoice(pageNo:number,pageSize:number,invoice:Invoice){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,invoice);
  }
}
