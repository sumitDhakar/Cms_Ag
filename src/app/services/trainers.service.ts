import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trainers } from '../entites/trainers';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {
  
  
  
  getAllEmployees(pageIndex: number, pageSize: number) {
  throw new Error('Method not implemented.');
}
baseUrl=environment.hostUrl+'/admin/trainers';

constructor(private httpClient:HttpClient) { }
// add Trainers
addTrainers(trainers:Trainers){
  
  return this.httpClient.post(`${this.baseUrl}/`,trainers);
}
// get All Trainers
getAllTrainers(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}

// update 
updateTrainers(trainers:Trainers){
  return this.httpClient.put(`${this.baseUrl}/`,trainers);

  

}
  // search training-List
  searchTrainers(pageNo:number,pageSize:number,resignations:Trainers){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,resignations);
  }

//delete training-List   
deleteTrainers(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get training-List By Id
getTrainersByID(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}

    // get training-type by status
    getTrainingByStatus(status:String,id:number){
      return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
    }


    
  // get All training-type
  getAllTrainingTypeByStatusActive(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/byStatus/${pageNo}/${pageSize}`);
 }
   
  

}
