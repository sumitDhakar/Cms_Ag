import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageMapping } from 'src/app/materials/custome-routing/message-mapping';
import { ConversationRequest } from 'src/app/payload/chat/conversation-request';
import { ConversationResponse } from 'src/app/payload/chat/conversation-response';
import { MessageRequest } from 'src/app/payload/chat/message-request';
import { ImageUtil } from 'src/app/payload/image-util';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/chat/conversation.service';
import { MessageService } from 'src/app/services/chat/message-service.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit,OnDestroy{


  constructor(private adminUserService: AdminUsersService,private webSocketService:WebSocketService,private authService:AuthService,private conversationService:ConversationService
    ,private messageService:MessageService,private activatedRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
     this.webSocketService.disConnect();
  }
  ngOnInit(): void {
    this.currentUserId= this.authService.getUser().id;
    this.recipientId   =  this.activatedRoute.snapshot.params['recipientId'];
    alert(this.recipientId)
 this.getConversation(this.recipientId);
  }
  recipientId:any;

    imageUtils:ImageUtil=new ImageUtil();
    imageUrl  =this.imageUtils.getImageUrl();     
  currentUserId:any;
  
    pageNo = 0;
    pageSize = 11;
  conversation!:ConversationResponse;
  
  messages:any[]=[];
  
  msg:any;
  
  message:MessageRequest=new MessageRequest();
  



  

getConversation(recipient:any){
  let requst: ConversationRequest = new ConversationRequest();
requst.senderId=this.authService.getUser().id;
 requst.recipientId =recipient;
 this.conversationService.getConversation(requst).subscribe((data:any)=>{
           this.conversation = data.data;
           this.message.conversationId = this.conversation.conversationId;
        console.log(data);
        this.recieveMessage();
        this.getOldMessages();
        this.messages=[];
 },err=>{
   if(err.status==404){
     this.conversationService.createConversation(requst).subscribe((data:any)=>{
         this.conversation =data.data;
         this.recieveMessage();
         this.getOldMessages();
         this.messages=[];
     })
   }
 })
}


sendMessage(){
  this.message = new MessageRequest();
  this.message.message=this.msg;
this.msg="";
  this.message.sender = this.currentUserId;
  this.message.recipient = this.conversation.user.id;
  this.message.conversationId = this.conversation.conversationId;

   this.webSocketService.sendMessage(MessageMapping.SEND_MESSAGE,this.message);
   this.messages.push(this.message);   
   console.log(this.message);
   
} 

recieveMessage(){
  this.webSocketService.subscribeMessgae(MessageMapping.RECIEVE_MESSAGE+this.conversation.user.id+"/"+this.currentUserId).subscribe((data:any)=>{
    this.messages.push(data);
    console.log(this.messages);
    
  });
}



getOldMessages(){
  this.messageService.getMessageOfConversationById(this.conversation.conversationId).subscribe((data:any)=>{
      this.messages=data.data;
      console.log(data);
      
  })
}


}
