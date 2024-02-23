import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EducationInformations } from '../entites/education-informations';

@Injectable({
  providedIn: 'root'
})
export class EducationInformationsService {
  baseUrl = environment.hostUrl + "/educationInformations"


  constructor(private httpClient: HttpClient) { }

  // adding 
  addEducationInformations(educationInformations:EducationInformations[],userId:number){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
       formData.append("data",new Blob([JSON.stringify(educationInformations)],{type:'application/json'}));
       return this.httpClient.post(`${this.baseUrl}/${userId}`,formData);
    }

  // getEducationInformationsById
  getEducationInformationsByUserId(employeeId: number) {
    return this.httpClient.get(`${this.baseUrl}/${employeeId}`);
  }
}
