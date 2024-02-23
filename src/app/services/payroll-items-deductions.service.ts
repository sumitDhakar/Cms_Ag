import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayrollItemsDeductions } from '../entites/payroll-items-deductions';

@Injectable({
  providedIn: 'root'
})
export class PayrollItemsDeductionsService {

  baseUrl=environment.hostUrl+'/admin/payrollItemsDeductions';

  constructor(private httpClient:HttpClient) { }
// add PayrollItemsDeductions
  addPayrollItemsDeductions(payrollItemsDeductions:PayrollItemsDeductions){
    
    return this.httpClient.post(`${this.baseUrl}/`,payrollItemsDeductions);
 }
// update PayrollItemsDeductions
updatePayrollItemsDeductions(payrollItemsDeductions:PayrollItemsDeductions){
  return this.httpClient.put(`${this.baseUrl}/`,payrollItemsDeductions);

}
//delete payrollItemsDeductions  
deletePayrollItemsDeductions(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get payrollItemsDeductions By Id
getpayrollItemsDeductionsByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}


  // get All PayrollItemsDeductions
  getAllPayrollItemsDeductions(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }


}
