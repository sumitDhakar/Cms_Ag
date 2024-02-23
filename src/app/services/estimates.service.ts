import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estimates } from '../entites/estimates';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {
  baseUrl = environment.hostUrl + "/admin/hr/estimate"


  constructor(private httpClient: HttpClient) { }

  // adding 
  addEstimates(estimates:Estimates){
    return this.httpClient.post(`${this.baseUrl}/`,estimates);
    }


  // get all expenses
  getAllEstimates(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // getExpensesById
  getEstimatesById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

// update 
updateEstimates(estimates: Estimates){
  return this.httpClient.put(`${this.baseUrl}/`,estimates);

}

  // update expenses status
  updateExpensesStatus( id: number,status: string,) {
    return this.httpClient.put(`${this.baseUrl}/status/${id}`, status);
  }
 // search GoalType
 searchExpenses(pageNo:number,pageSize:number,estimates:Estimates){
  return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,estimates);
}

  
deleteExpenses(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/delete/${deleteId}`);
}

}
