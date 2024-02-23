import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmergencyContact } from '../entites/emergency-contact';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {
  baseUrl = environment.hostUrl + "/emergencyContact"


  constructor(private httpClient: HttpClient) { }

  // adding 
  addEmergencyContact(emergencyContact:EmergencyContact,userId:number){
    return this.httpClient.post(`${this.baseUrl}/${userId}`,emergencyContact);
    }

  // getEmergencyContactById
  getEmergencyContactById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }}
