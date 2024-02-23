import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EducationInformations } from 'src/app/entites/education-informations';
import { ExperienceInformations } from 'src/app/entites/experience-informations';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ExperienceinformationService {

  baseUrl = environment.hostUrl + "/experienceInformations"


  constructor(private httpClient: HttpClient) { }

  // adding 
  addExperienceInformation(experienceInformation:ExperienceInformations[],userId:number){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
       formData.append("data",new Blob([JSON.stringify(experienceInformation)],{type:'application/json'}));
       return this.httpClient.post(`${this.baseUrl}/${userId}`,formData);
    }

  // getExperienceInformationsById
  getExperienceInformationByUserId(userProfileId: number) {
    return this.httpClient.get(`${this.baseUrl}/${userProfileId}`);
  }
}





