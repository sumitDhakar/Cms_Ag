import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerformanceAppraisal } from '../entites/performance-appraisal';

@Injectable({
  providedIn: 'root'
})
export class PerformanceAppraisalService {
  
  baseUrl=environment.hostUrl+'/admin/performanceApprisal';

  constructor(private httpClient:HttpClient) { }
  
  addPerformanceAppraisal(performanceAppraisal:PerformanceAppraisal){
     return this.httpClient.post(`${this.baseUrl}/create`,performanceAppraisal);
    }
    
    getAllPerformanceAppraisal(pageNo:number,pageSize:number){
      return this.httpClient.get(`${this.baseUrl}/getall/${pageNo}/${pageSize}`);
    }
    
    getPerformanceAppraisalByID(id:number){
      return this.httpClient.get(`${this.baseUrl}/get/${id}`);
    }
    
 
  updatePerformanceAppraisal(performanceAppraisal:PerformanceAppraisal){
    return this.httpClient.put(`${this.baseUrl}/update`,performanceAppraisal);
  }
  
  deletePerformanceAppraisal(id:any){
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  searchPerformanceAppraisal(pageIndex: number, pageSize: number, performanceAppraisal: PerformanceAppraisal) {
    return this.httpClient.post(`${this.baseUrl}/search/${pageIndex}/${pageSize}`,performanceAppraisal);
  }

  
  // get PerformanceAppraisal by status
updatePerformanceAppraisalStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}
}
