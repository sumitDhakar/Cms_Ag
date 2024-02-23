import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resignation } from '../entites/resignation';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {

  baseUrl=environment.hostUrl+'/resignations';

  constructor(private httpClient:HttpClient) { }
// add resignations
  addResignation(resignations:Resignation){
    return this.httpClient.post(`${this.baseUrl}/`,resignations);
 }
// update 
updateResignation(resignations:Resignation){
  return this.httpClient.put(`${this.baseUrl}/`,resignations);

}
//delete resignations   
deleteResignation(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get resignations By Id
getResignationByID(resignationsId:number){
  return this.httpClient.get(`${this.baseUrl}/${resignationsId}`);
}


  // get All resignations
  getAllResignation(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }



  // search resignations
  searchResignation(pageNo:number,pageSize:number,resignations:Resignation){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,resignations);
  }

}