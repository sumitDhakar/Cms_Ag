import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdministiationUser } from '../entites/administiation-user';

@Injectable({
  providedIn: 'root'
})
export class AdministiationUserService {


  baseUrl=environment.hostUrl+'/administiationUser';

  constructor(private httpClient:HttpClient) { }

  // get All AdministiationUser
 getAllAdministiationUser(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}

deleteAdministiationUser(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}


// get AdministiationUser By Id
getAdministiationUserByID(assetsId:number){
  return this.httpClient.get(`${this.baseUrl}/${assetsId}`);
}
// update 
updateAdministiationUser(administiationUser:AdministiationUser){
  return this.httpClient.put(`${this.baseUrl}/`,administiationUser);

}

}
