import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tickets } from '../entites/tickets';
import { TicketRequest } from '../payload/ticket-request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  
  baseUrl = environment.hostUrl + '/admin/tickets';

  constructor(private httpClient: HttpClient) { }

  
  // add Ticket 

  addTicket(ticket: Tickets) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
    
    
       if(ticket.files.length!=0)
       {
       for(const file of ticket.files)
      formData.append("files[]",file);
       }
    
      else
      {
      formData.append("files[]",'null');
      }
    
      
       formData.append("data",new Blob([JSON.stringify(ticket)],{type:'application/json'}));
    
    
       return this.httpClient.post(`${this.baseUrl}/create`,formData,{headers});
     }

  // update ticket 
  updateTicket(tickets: Tickets) {
    return this.httpClient.put(`${this.baseUrl}/`, tickets);
  }

  // get all ticket 
  getAllTickets( pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }
  // get all ticket 
  getTicketsStatics(){
    return this.httpClient.get(`${this.baseUrl}/statics`);
  }

  // get ticket  by id
  getTicketsById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // delete ticket  by id
  deleteTickets(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  //searching ticket
  searchTickets(pageNo:number,pageSize:number,ticket:TicketRequest)
  {

    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,ticket);
  }

    // download file from server 
    downloadFileInFolder(id:number):Observable<HttpEvent<Blob>>{
      return this.httpClient.get(`${this.baseUrl}/download/${id}`,{
       reportProgress:true,
       observe:'events',
       responseType:'blob'
     
      })
       }


       // get ticket by status
getticketByStatus(status:String,id:number,ofType:string){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}/${ofType}`);
}


       
   // delete ticketFiles file by id
  deleteTicketFileByID(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }


  // download file from server 
  downloadTicketFileIamges(id:number):Observable<HttpEvent<Blob>>{
    return this.httpClient.get(`${this.baseUrl}/download/${id}`,{
     reportProgress:true,
     observe:'events',
     responseType:'blob'
   
    })
     }
  
  }



