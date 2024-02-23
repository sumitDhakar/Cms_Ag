import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoalType } from '../entites/goal-type';
import { Promotion } from '../entites/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {  
  
  baseUrl=environment.hostUrl+'/promotion';

constructor(private httpClient:HttpClient) { }

addPromotion(promotion:Promotion){
  return this.httpClient.post(`${this.baseUrl}/`,promotion);
}
// update 
updatePromotion(promotion:Promotion){
return this.httpClient.put(`${this.baseUrl}/`,promotion);

}
//delete GoalType   
deletePromotionById(deleteId: number) {
return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get GoalType By Id
getPromotionByPromotionId(goaltypeId:number){
return this.httpClient.get(`${this.baseUrl}/${goaltypeId}`);
}


// get All GoalType
getAllPromotions(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}

// get All Promotions As list
// getAllGoalTypeList(){
// return this.httpClient.get(`${this.baseUrl}/all`);
// }

// update promotion by status
// UpdatePromotionByStatus(status:String,id:number){
// return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
// }

// search GoalType
searchPromotionByExample(pageNo:number,pageSize:number,promotion:Promotion){
  return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,promotion);
}


}
