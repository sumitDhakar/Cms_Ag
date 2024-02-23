import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from 'src/app/entites/chat/conversation';
import { ConversationRequest } from 'src/app/payload/chat/conversation-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private httpClient:HttpClient) { }

  baseUrl  = environment.hostUrl;

  createConversation(conversationRequest:ConversationRequest){
    return this.httpClient.post<any>(this.baseUrl+"/chat/conversation",conversationRequest);
  }


  getConversation(conversationRequest:ConversationRequest){
    return this.httpClient.post<any>(this.baseUrl+"/chat/conversation/getId",conversationRequest);
  }

  getConversationUsers(){
    return this.httpClient.get<any>(this.baseUrl+"/chat/conversation/users");
  }
}
