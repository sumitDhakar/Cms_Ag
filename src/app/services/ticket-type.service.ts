import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketType } from '../entites/ticket-type';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {

  baseUrl = environment.hostUrl + '/admin/ticketType';

  constructor(private httpClient: HttpClient) { }

  // add ticket type
  addTicketType(ticketType: TicketType) {
    return this.httpClient.post(`${this.baseUrl}/`, ticketType);
  }

  // update ticket type
  updateTicketType(ticketType: TicketType) {
    return this.httpClient.put(`${this.baseUrl}/`, ticketType);
  }

  // get all ticket type
  getAllTicketType( pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // get ticket type by id
  getTicketTypeById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
//searching TicketType
searchTicketType(pageNo:number,pageSize:number,ticket:TicketType)
{

  return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,ticket);
}



  // delete ticket type by id
  deleteTicketType(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }


}
