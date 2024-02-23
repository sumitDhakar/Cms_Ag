import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { PerformanceIndicator } from '../entites/performance-indicator';

@Injectable({
  providedIn: 'root'
})
export class PerfomanceaIndicatorService {
  
  baseUrl=environment.hostUrl+'/admin/performanceIndicator';

  constructor(private httpClient:HttpClient) { }
  
  addPerformanceIndicator(performanceIndicator:PerformanceIndicator){
     return this.httpClient.post(`${this.baseUrl}/add`,performanceIndicator);
    }
    
    getAllPerformanceIndicator(pageNo:number,pageSize:number){
      return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
    }
    
    getPerformanceIndicatorById(id:number){
      return this.httpClient.get(`${this.baseUrl}/${id}`);
    }
    
 
  updatePerformanceIndicator(performance:PerformanceIndicator){
    return this.httpClient.put(`${this.baseUrl}/update`,performance);
  }
  
  deletePerformanceIndicator(id:any){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  searchPerformanceIndicator(pageIndex: number, pageSize: number, performanceIndicator: PerformanceIndicator) {
    return this.httpClient.post(`${this.baseUrl}/search/${pageIndex}/${pageSize}`,performanceIndicator);
  }

  // get PerformanceIndicator by status
updatePerformanceIndicatorStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

}

  