import { JsonPipe } from '@angular/common';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatFileRequest } from 'src/app/payload/chat/chat-file-request';
import { ConversationRequest } from 'src/app/payload/chat/conversation-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatFilesService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.hostUrl;

  chatFilderPat = "Chats"

  public saveChatFiles(chatFileRequest: ChatFileRequest) {
    let formData = new FormData();
    formData.append("chatFile", chatFileRequest.chatFile);
    formData.append("messageId", JSON.stringify(chatFileRequest.messageId));
    return this.httpClient.post<any>(`${this.baseUrl}/chat/files`, formData, {
      reportProgress: true,
      observe: 'events',


    })
  }


getConversationFiles(conversationRequest:ConversationRequest){
   return this.httpClient.post(`${this.baseUrl}/chat/files/profile`,conversationRequest);
}



  downloadChatFile(serverFileName: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.get(`${this.baseUrl}/chat/files/download/${this.chatFilderPat}/${serverFileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'

    });
  }

}
