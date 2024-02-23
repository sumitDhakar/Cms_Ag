import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Holidays } from '../entites/holidays';
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  baseUrl=environment.hostUrl+'';

  constructor(private httpClient:HttpClient) { }

  addHoliday(holiday:Holidays){
     return this.httpClient.post(`${this.baseUrl}/admin/holidays`,holiday);
  }

  getAllHolidays(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  getHolidaysById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  
  updateHoliday(holiday:Holidays){
    return this.httpClient.put(`${this.baseUrl}/admin/holidays`,holiday);
  }

  deleteHoliday(id:any){
    return this.httpClient.delete(`${this.baseUrl}/admin/holidays/${id}`);
  }

  
  fetchDetailsHoildayes(){
    return this.httpClient.get(`${this.baseUrl}/`);
  }


}
