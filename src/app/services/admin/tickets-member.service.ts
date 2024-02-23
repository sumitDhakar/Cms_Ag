import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketsMember } from 'src/app/entites/tickets-member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsMemberService {
  baseUrl=environment.hostUrl + '/admin/ticketsMember'

  constructor(private httpClient:HttpClient) { }

  // add ticket member
  addTicketMember(projectMember:TicketsMember[]){
    return this.httpClient.post(`${this.baseUrl}/`,projectMember);
  }

  // update ticket member
  updateProjectMember(projectMember:TicketsMember){
    return this.httpClient.put(`${this.baseUrl}/`,projectMember);
  }

  // get Tickets member by id
  getTicketsMemberById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // // get all Tickets members
  // getAllTicketsMember(pageNo:number,pageSize:number){
  //   return  this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  // }

  // get Tickets member of Tickets by Tickets Id
  getTicketsMemberByTicketsId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/tickets/${pageNo}/${pageSize}/${id}`);
  }

  // get Tickets member of Tickets by user Id
  getTicketsMemberByUserId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/user/${pageNo}/${pageSize}/${id}`);
  }

  // make Tickets member leader
  makeLeader(ticketsMember:TicketsMember){
    return this.httpClient.put(`${this.baseUrl}/leader`,ticketsMember);
  }


  // delete Tickets member
  deleteTicketsMember(id:any){
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }


}
