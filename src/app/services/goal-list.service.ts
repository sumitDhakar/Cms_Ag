import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  GoalList   } from '../entites/goal-list';

@Injectable({
  providedIn: 'root'
})
export class GoalListService {
 
  baseUrl=environment.hostUrl+'/goalList';

  constructor(private httpClient:HttpClient) { }

  addGoalList(goalList:GoalList){
    return this.httpClient.post(`${this.baseUrl}/`,goalList);
 }
// update 
updateGoalList(goalList:GoalList){
  return this.httpClient.put(`${this.baseUrl}/`,goalList);

}
//delete goalList   
deleteGoalList(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get goalList By Id
getGoalListByID(goallistId:number){
  return this.httpClient.get(`${this.baseUrl}/${goallistId}`);
}


  // get All goalList
  getAllGoalList(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }
 // get goalList by status
 getGoalListByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

  // search goalList
  searchGoalList(pageNo:number,pageSize:number,goalList:GoalList){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,goalList);
  }


}

