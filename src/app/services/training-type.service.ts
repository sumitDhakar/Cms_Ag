import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainingType } from '../entites/training-type';

@Injectable({
  providedIn: 'root'
})

export class TrainingTypeService {

  baseUrl=environment.hostUrl+'/admin/trainingType';

  constructor(private httpClient:HttpClient) { }
// add training-type
  addTrainingType(trainingType:TrainingType){
    
    return this.httpClient.post(`${this.baseUrl}/`,trainingType);
 }
// update 
updateTrainingType(trainingType:TrainingType){
  return this.httpClient.put(`${this.baseUrl}/`,trainingType);

}
//delete training-type   
deleteTrainingType(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get training-type By Id
getTrainingTypeByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}


  // get All training-type
  getAllTrainingType(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }


  // get All training-type
  getAllTrainingTypeByStatusActive(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/byStatus/${pageNo}/${pageSize}`);
 }



  // search training-type
  searchTrainingType(pageNo:number,pageSize:number,resignations:TrainingType){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,resignations);
  }


    // get training-type by status
    geTrainingTypeByStatus(status:String,id:number){
      return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
    }

}
