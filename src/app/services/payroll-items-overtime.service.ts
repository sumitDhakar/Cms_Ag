import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayrollItemsOvertime } from '../entites/payroll-items-overtime';

@Injectable({
  providedIn: 'root'
})
export class PayrollItemsOvertimeService {
  baseUrl=environment.hostUrl+'/admin/PayrollItemsOvertime';

  constructor(private httpClient:HttpClient) { }
// add payrollItemsOvertime
  addPayrollItemsOvertime(payrollItemsOvertime:PayrollItemsOvertime){
    
    return this.httpClient.post(`${this.baseUrl}/`,payrollItemsOvertime);
 }
// update PayrollItemsOvertime
updatePayrollItemsOvertime(payrollItemsOvertime:PayrollItemsOvertime){
  return this.httpClient.put(`${this.baseUrl}/`,payrollItemsOvertime);

}
//delete PayrollItemsOvertime  
deletePayrollItemsOvertime(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get PayrollItemsOvertime By Id
getPayrollItemsOvertimeByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}


  // get All PayrollItemsDeductions
  getAllPayrollItemsOvertime(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }


}
