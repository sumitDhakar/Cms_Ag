import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Message } from 'src/app/entites/chat/message';
import { UserUpdateStatusRequest } from 'src/app/payload/chat/user-update-status-request';
import { MessageMapping } from 'src/app/materials/custome-routing/message-mapping';
import { AuthService } from '../auth.service';
import { UserStatus } from 'src/app/entites/chat/user-status';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }
  private stompClient: any;

  Pending = {
    message: '',
    topic: ''
  }

  queue: any[] = [

  ];
  // messageReceived: Subject<Message> = new Subject<Message>();
  // messageData: Observable<Message > = this.messageReceived.asObservable();
  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:9100/ws');
    this.stompClient = Stomp.over(socket);

    this.connect();
  }

  connect() {
    if (this.stompClient === undefined || this.stompClient == null) {
      const socket = new SockJS('http://localhost:9100/ws');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, (frame: string) => {
        console.log('Connected: ' + frame);
         // sending the messages of queue
         this.queue.forEach(m=>{
          this.sendMessage(m.topic,m.message);
         })
      });

    }
  }
  disConnect() {
    this.stompClient.disconnect();
  }

  sendMessage(desitination: string, message: any) {
    // pushing the messages in queue if connection not stablished
    if (this.stompClient === undefined || this.stompClient == null)
         this.pushIntoQueue(desitination, message);
    else
       this.stompClient.send(desitination, {}, JSON.stringify(message));
  }

  subscribeMessgae(desitination: string) {
    return new Observable<any>((observer) => {
      this.stompClient.subscribe(desitination, (messages: { body: any; }) => {
        // Handle incoming messages
        // console.log(messages);
        observer.next(JSON.parse(messages.body));
      })
    });
  }


  pushIntoQueue(desitination: string, message: any) {
   let messge ={
    message: message,
    topic: desitination
   }
   this.queue.push(messge);
  }

  updateStatus(status:any,userId:any){
    let updateRequest = new UserUpdateStatusRequest();
    updateRequest.status = status;
    updateRequest.userId = userId;
    if(this.stompClient)
    this.sendMessage(MessageMapping.STATUS_UPDATE, updateRequest);

  }


  

}

