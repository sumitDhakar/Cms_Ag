import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainingList } from '../entites/training-list';

@Injectable({
  providedIn: 'root'
})
export class TrainingListService {
  getAllEmployees(pageIndex: number, pageSize: number) {
    throw new Error('Method not implemented.');
  }
  baseUrl=environment.hostUrl+'/admin/trainingList';

  constructor(private httpClient:HttpClient) { }
// add training-List
  addTrainingList(TrainingList:TrainingList){
    
    return this.httpClient.post(`${this.baseUrl}/`,TrainingList);
 }
// update 
updateTrainingList(TrainingList:TrainingList){
  return this.httpClient.put(`${this.baseUrl}/`,TrainingList);

}
//delete training-List   
deleteTrainingList(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get training-List By Id
getTrainingListByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}


  // get All training-List
  getAllTrainingList(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }



  // search training-List
  searchTrainingList(pageNo:number,pageSize:number,resignations:TrainingList){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,resignations);
  }

      // get training-List by status
getTrainingListByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

}
