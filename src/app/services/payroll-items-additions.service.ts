import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayrollItemsAdditions } from '../entites/payroll-items-additions';

@Injectable({
  providedIn: 'root'
})
export class PayrollItemsAdditionsService {

  baseUrl=environment.hostUrl+'/admin/payrollItemsAdditions';

  constructor(private httpClient:HttpClient) { }
// add PayrollItemsAdditions
  addPayrollItemsAdditions(payrollItemsAdditions:PayrollItemsAdditions){
    
    return this.httpClient.post(`${this.baseUrl}/`,payrollItemsAdditions);
 }
// update PayrollItemsAdditions
updatePayrollItemsAdditions(payrollItemsAdditions:PayrollItemsAdditions){
  return this.httpClient.put(`${this.baseUrl}/`,payrollItemsAdditions);

}
//delete PayrollItemsAdditions  
deletePayrollItemsAdditions(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get PayrollItemsAdditions By Id
getPayrollItemsAdditionsByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}


  // get All PayrollItemsAdditions
  getAllPayrollItemsAdditions(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }


}
