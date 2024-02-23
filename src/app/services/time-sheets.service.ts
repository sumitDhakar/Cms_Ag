import { Injectable } from '@angular/core';
import { TimeSheets } from '../entites/time-sheets';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetsService {

  baseUrl = environment.hostUrl + "/employee/timesheets"


  constructor(private httpClient: HttpClient) { }


  // add timeSheets
  addTimeSheets(timeSheets: TimeSheets){
    
    return this.httpClient.post(`${this.baseUrl}/`,timeSheets);
 }


  // get all timeSheets 
  getAllTimeSheets(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // gettimeSheetsById
  getTimeSheetsById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

// update timeSheets
updateTimeSheets(timeSheets: TimeSheets){
  return this.httpClient.put(`${this.baseUrl}/`,timeSheets);

}

  

  
deleteTimeSheets(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}

}
