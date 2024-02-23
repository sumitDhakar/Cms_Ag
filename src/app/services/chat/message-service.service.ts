import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/entites/chat/message';
import { MessageDeleteRequest } from 'src/app/payload/chat/message-delete-request';
import { MessageRequest } from 'src/app/payload/chat/message-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.hostUrl;

  // get messages by conversation id
  getMessageOfConversationById(conversationId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/chat/message/conversation?converId=${conversationId}`);
  }

  // save messages    (using this for file upload)
  public saveMessage(message: MessageRequest) {
    return this.httpClient.post<any>(`${this.baseUrl}/chat/message`, message);
  }

  public deleteMessges(messageDeleteRequest:MessageDeleteRequest){
    return this.httpClient.post(`${this.baseUrl}/chat/message/delete`,messageDeleteRequest);
  }


}
