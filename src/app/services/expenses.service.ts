import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expenses } from '../entites/expenses';
import { Observable } from 'rxjs';
import { AppliedCandidate } from '../entites/applied-candidate';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  baseUrl = environment.hostUrl + "/hr/expenses"


  constructor(private httpClient: HttpClient) { }

  // add expenses 

  addExpenses(expenses:Expenses){
    const headers = new HttpHeaders({
   'enctype': 'multipart/form-data'
   //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
 });
    const formData = new FormData();
 
 
    if(expenses.expensesFiles.length!=0)
    {
    for(const file of expenses.expensesFiles)
   formData.append("files[]",file);
    }
 
   else
   {
     alert("yes")
   formData.append("files[]",'null');
   }
 
   
    formData.append("data",new Blob([JSON.stringify(expenses)],{type:'application/json'}));
 
 
    return this.httpClient.post(`${this.baseUrl}/create`,formData,{headers});
   }
 
   // update expenses
   updateExpenses(expenses:Expenses){
     const headers = new HttpHeaders({
       'enctype': 'multipart/form-data'
       //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
     });
        const formData = new FormData();
             if(expenses.files.length!=0)
        {
        for(const file of expenses.files)
       formData.append("files[]",file);
        }
     
        
       else
       {
         alert("yes")
       formData.append("files[]",'null');
       }
     
        formData.append("data",new Blob([JSON.stringify(expenses)],{type:'application/json'}));
     
     
     return this.httpClient.put(`${this.baseUrl}/`,formData,{headers});
   }
 
 
  // get all expenses
  getAllExpenses(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // getExpensesById
  getExpensesById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }



  // update expenses status
  updateExpensesStatus( id: number,status: string,) {
    return this.httpClient.put(`${this.baseUrl}/status/${id}`, status);
  }
 // search GoalType
 searchExpenses(pageNo:number,pageSize:number,expenses:Expenses){
  return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,expenses);
}

  
deleteExpenses(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}

  // download file from server 
  downloadFile(id: number): Observable<HttpEvent<Blob>> {
    return this.httpClient.get(`${this.baseUrl}/download/${id}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'

    })
  }

}