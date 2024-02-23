import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectFileService {

   baseUrl=environment.hostUrl+"/admin/projectFiles"

  constructor(private httpClient:HttpClient) { }

   
  // add project file with project id and uploaded by
  addProjectFile(files:any,projectId:number,type:any){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
    
    
       if(files.length!=0)
       {
       for(const file of files)
      formData.append("files[]",file);
       }
      else
      {
      formData.append("files[]",'null');
      }
     return this.httpClient.post(`${this.baseUrl}/create/${projectId}/${type}`,formData,{headers});
    
      
  }



   // delete project file by id
  deleteProjectFileById(id:number,type:any){
    return this.httpClient.delete(`${this.baseUrl}/${id}/${type}`)
  }


  // download file from server 
  downloadFile(id:number):Observable<HttpEvent<Blob>>{
    return this.httpClient.get(`${this.baseUrl}/download/${id}`,{
     reportProgress:true,
     observe:'events',
     responseType:'blob'
   
    })
     }

}
