import {Injectable} from '@angular/core';

import { Observable, Subject, share } from 'rxjs'



@Injectable()
export class WebsocketService {
  SOCKET_URL ="/socket"
  private stompClient: any;
  private messagesSubject: Subject<any> = new Subject<any>();
  private messagesObservable: Observable<any>;

  constructor() {
    this.connect();
    this.messagesObservable = this.messagesSubject.asObservable().pipe(share());
  }
  public connect(): void {
 //   const socket = new SockJS("http:localhost:8080/rise/socket");
   // this.stompClient = Stomp.over(socket);
  //  this.stompClient.connect({}, (frame: any) => {
      // this.stompClient.subscribe('/queue/messages', (message: any) => {
      //   const parsedMessage = JSON.parse(message.body);
      // //  console.log = () => { };
      //   this.messagesSubject.next(parsedMessage);
      // });
   // });//
  }

  public getMessages(): Observable<any> {
    return this.messagesObservable;
  }
  public sendMessage(message: any): void {
    this.stompClient.send('/api/socket', {}, JSON.stringify(message));
  }
}
