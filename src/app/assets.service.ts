import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assets } from './entites/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
 
  baseUrl=environment.hostUrl+'/administration/assets';

  constructor(private httpClient:HttpClient) { }

  addAssets(assets:Assets){
    return this.httpClient.post(`${this.baseUrl}/`,assets);
 }
 // get All Assets
 getAllAssets(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}

deleteAssets(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get Assets by status
getAssetsByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

  // search Assets
  searchAssets(pageNo:number,pageSize:number,assets:Assets){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,assets);
  }

// get Assets By Id
getAssetsByID(assetsId:number){
  return this.httpClient.get(`${this.baseUrl}/${assetsId}`);
}
// update 
updateAssets(assets:Assets){
  return this.httpClient.put(`${this.baseUrl}/`,assets);

}
}
