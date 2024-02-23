import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FamilyInformations } from 'src/app/entites/family-informations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamlyinformationtionService {

  constructor(private httpclient: HttpClient) { }

  baseUrl = environment.hostUrl + '/admin/familyInformations';


  addFamilyInformations(familyinformation: FamilyInformations[], userId: number) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(familyinformation)], { type: 'application/json' }));
    return this.httpclient.post(`${this.baseUrl}/${userId}`, formData);
  }
  updateFamilyInformation(familyinformation: FamilyInformations) {

    return this.httpclient.put(`${this.baseUrl}/`, familyinformation)
  }


  getFamilyInformation(id: number) {
    return this.httpclient.get(`${this.baseUrl}/getfinfo/${id}`)

  }
  getAllFamilyInformation(userProfileId: number) {


    return this.httpclient.get(`${this.baseUrl}/byprofile/${userProfileId}`)
  }

}
