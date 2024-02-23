import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  GoalType   } from '../entites/goal-type';
@Injectable({
  providedIn: 'root'
})
export class GoalTypeService {

  baseUrl=environment.hostUrl+'/goalType';

  constructor(private httpClient:HttpClient) { }

  addGoalType(goalType:GoalType){
    return this.httpClient.post(`${this.baseUrl}/`,goalType);
 }
// update 
updateGoalType(goalType:GoalType){
  return this.httpClient.put(`${this.baseUrl}/`,goalType);

}
//delete GoalType   
deleteGoalType(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get GoalType By Id
getGoalTypeByID(goaltypeId:number){
  return this.httpClient.get(`${this.baseUrl}/${goaltypeId}`);
}


  // get All GoalType
  getAllGoalType(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }

 // get All GoalType As list
 getAllGoalTypeList(){
  return this.httpClient.get(`${this.baseUrl}/all`);
}
 // get GoalType by status
 getGoalTypeByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

  // search GoalType
  searchGoalType(pageNo:number,pageSize:number,goalType:GoalType){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,goalType);
  }

    
  // get All training-type
  getAllGoalTypeByStatusActive(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/byStatus/${pageNo}/${pageSize}`);
 }

}
