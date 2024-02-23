import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonalInformations } from '../entites/personal-informations';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationsService {
  baseUrl = environment.hostUrl + "/personalInformations"


  constructor(private httpClient: HttpClient) { }

  // adding 
  addPersonalInformations(personalInformations:PersonalInformations,userId:number){
    return this.httpClient.post(`${this.baseUrl}/${userId}`,personalInformations);
    }

  // getPersonalInformationsById
  getPersonalInformationsById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }}
