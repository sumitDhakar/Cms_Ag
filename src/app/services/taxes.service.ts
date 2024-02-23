import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Taxes } from '../entites/taxes';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  baseUrl=environment.hostUrl+'/taxes';

  constructor(private httpClient:HttpClient) { }
// add taxes
  addTaxes(taxes:Taxes){
    
    return this.httpClient.post(`${this.baseUrl}/`,taxes);
 }

// get All taxes
getAllTaxes(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}

// get All taxe-by-status
getAllTaxeByStatusActive(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/byStatus/${pageNo}/${pageSize}`);
}

// update taxes
updateTaxes(taxes:Taxes){
  return this.httpClient.put(`${this.baseUrl}/`,taxes);

  

}
  // search training-List
  searchTaxes(pageNo:number,pageSize:number,resignations:Taxes){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,resignations);
  }

//delete training-List   
deleteTaxes(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get training-List By Id
getTaxesByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}

// get goalList by status
getTaxesByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

getAllTasksByProjectAndCurrentUser(){}

}
