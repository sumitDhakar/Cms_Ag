import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { AppliedCandidate } from '../entites/applied-candidate';

@Injectable({
  providedIn: 'root'
})
export class AppliedCandidateService {

  baseUrl = environment.hostUrl + "/admin/appliedCandidate"


  constructor(private httpClient: HttpClient) { }

  // add appliedCandidate 
  addCandidate(appliedCandidate: AppliedCandidate) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
    
    
       if(appliedCandidate.candidateFile!=null)
       {
        alert("came")
      formData.append("files[]",appliedCandidate.candidateFile);
       }
    
      else
      {
      formData.append("files[]",'null');
      }
   
      
       formData.append("data",new Blob([JSON.stringify(appliedCandidate)],{type:'application/json'}));
    
    
       return this.httpClient.post(`${this.baseUrl}/create`,formData,{headers});
      
  }


  // get all project
  getAllAppliedCandidate(pageNo: number, pageSize: number,mId:number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}/${mId}`);
  }

  // getProjectById
  getAppliedCandidateById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }



  // update project status
  updateCandidateStatus(status: string, id: number) {
    return this.httpClient.put(`${this.baseUrl}/status/${id}`, status);
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
