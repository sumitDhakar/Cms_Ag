import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, range } from 'rxjs';
import { ChatMessagesManager } from 'src/app/entites/chat/chat-messages-manager';
import { ConversationUser } from 'src/app/entites/chat/conversation-user';
import { FileStatus } from 'src/app/entites/chat/file-status';
import { Message } from 'src/app/entites/chat/message';
import { UserStatus } from 'src/app/entites/chat/user-status';
import { Users } from 'src/app/entites/users';
import { MessageMapping } from 'src/app/materials/custome-routing/message-mapping';
import { CanComponentDeactivate } from 'src/app/materials/guards/chat-deactive.guard';
import { ChatFileRequest } from 'src/app/payload/chat/chat-file-request';
import { ConversationMessageHistory } from 'src/app/payload/chat/conversation-message-history';
import { ConversationRequest } from 'src/app/payload/chat/conversation-request';
import { ConversationResponse } from 'src/app/payload/chat/conversation-response';
import { MessageRequest } from 'src/app/payload/chat/message-request';
import { UserUpdateStatusRequest } from 'src/app/payload/chat/user-update-status-request';
import { ImageUtil } from 'src/app/payload/image-util';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatFilesService } from 'src/app/services/chat/chat-files.service';
import { ConversationService } from 'src/app/services/chat/conversation.service';
import { MessageService } from 'src/app/services/chat/message-service.service';
import { saveAs } from 'file-saver'; // Import the file-saver libraryv
import { ConversationProfile } from 'src/app/entites/chat/conversation-profile';
import { MessageDeleteRequest } from 'src/app/payload/chat/message-delete-request';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, CanComponentDeactivate, AfterViewChecked {

  ngOnInit(): void {
    this.getAllUsers();
    this.getConversationUsers();
    this.setBaseUrl();
    // calling the method after the web socket connection
    setTimeout(() => {
      this.getChatUserId();
      this.currentUserId = this.authService.getUser().id;
      try {
        this.updateStatus(UserStatus.Online);
        this.updateRecents();
      } catch (err) {
        console.log(err);
        
        setTimeout(() => {
          this.updateStatus(UserStatus.Online);
          this.updateRecents();

        }, 2000);
      }
    }, 1000);
    this.removeSidebarClass();

  }
  removeSidebarClass(){
    let element = document.getElementById("sidebar");
    element?.classList.remove("opened");
    console.log(element);
    
 }
  canDeactivate() {
    // updating user status online
    this.updateStatus(UserStatus.Offline);
    if (this.statusSubscibe)
      this.statusSubscibe.unsubscribe();
    this.removeChatUserId();
    return true;
  }

  constructor(private adminUserService: AdminUsersService, private webSocketService: WebSocketService, private authService: AuthService, private conversationService: ConversationService
    , private messageService: MessageService, private chatFileService: ChatFilesService) { }

  ngAfterViewChecked(): void {
    // setting div to end after any message send or receive
    let element = document.getElementById("scrollTest");
    if (element)
      element!.scrollTop = element!.scrollHeight;
  }

  socketObservables: ChatMessagesManager = new ChatMessagesManager();

  baseRoute = 'employee-dash'

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  statusSubscibe: any;

  userStatus = UserStatus;

  conversationId: any;
  todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();

  fileAccessUrl = this.imageUtils.getFileAccess() + "/Chats/";
  currentUserId: any;

  pageNo = 0;
  pageSize = 11;
  conversation!: ConversationResponse;

  messages: Map<any, any[]> = new Map<any, any[]>;

  msg: any = "";

  chatUsers: ConversationUser[] = [];

  message: MessageRequest = new MessageRequest();

  users: Users[] = []

  fileStatus = new FileStatus();
  files: any[] = [];
 
  conversationProfile!:ConversationProfile;

  uploadFileRequests: Observable<any>[] = [];
  showFiles: FileStatus[] = [];

  // getting all users
  getAllUsers() {
    this.adminUserService.getAllUsers(this.pageNo, this.pageSize).subscribe((data: any) => {
      this.users = data.content;
    })
  }



  onFile(event: any) {
    // checking max limit of files upload
    if (event.dataTransfer.files.length > MessageMapping.MAXIMUM_FILE_SEND_LIMIT)
      alert("Maximum limit 20 files")

    //  one file must present
    else if (event.dataTransfer.files.length > 0) {
      // event.dataTransfer.files;
      this.files = [];
      // pushing the file from the event to files array
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        if (!this.files.includes(event.dataTransfer.files[i]))
          this.files.push(event.dataTransfer.files[i]);
      }
      // giving files to upload method
      this.upload(this.files);
    }
    event.preventDefault();
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // preparing message for every file send
  preapreMessage() {
    this.message = new MessageRequest();
    this.message.message = this.msg;
    this.message.sender = this.currentUserId;
    this.message.recipient = this.conversation.user.id;
    this.message.conversationId = this.conversation.conversationId;
    this.message.sent = new Date().toString();
  }


  upload(files: any[]) {                             // * Note  -  one message can have multiple chat files  (one to many )

    this.showFiles = [];
    this.preapreMessage();
    // first saving the message to get the message id
    this.messageService.saveMessage(this.message).subscribe((data: any) => {
      // setting the message id into message 
      this.message.messageId = data.id;

      // pushing the message in the messages  map array
      let value = this.messages.get(this.todayDate) || [];
      value.push(this.message);
      this.message.sent = new Date().toString();
      this.messages.set(this.todayDate, value);

      // traversing files array to send file one by one
      files.forEach(f => {
        // making chat file request
        let chatFile = new ChatFileRequest();
        chatFile.chatFile = f;      // setting the file
        chatFile.messageId = data.id;   // setting the message id

        // preparing the post requests 
        let fileSubReq = this.chatFileService.saveChatFiles(chatFile)

        // file status holding file upload info with the post request
        let fileStatus = new FileStatus();
        fileStatus.fileName = f.name;
        fileStatus.fileSize = f.size;
        fileStatus.req = fileSubReq;
        //   fileStatus.subscribe(fileSubReq);

        // pushing the files in the files status array
        this.showFiles.push(fileStatus);
      })

      // traversing the array to subscribe the requests
      this.showFiles.forEach(f => {

        // subscribing the requests
        f.req.subscribe((event: any) => {

          // calculating the upload percent
          if (event.type === HttpEventType.UploadProgress) {
            f.percent = Math.round(100 * event.loaded / event.total!);

          } else if (event.type === HttpEventType.Response) {

            let value = this.messages.get(this.todayDate) || [];
            //      alert("sent")
            // pushing the files in the map array 
            value.forEach(m => {
              if (m.id === this.message.messageId || m.messageId === this.message.messageId) {
                if (!m.chatFiles.includes(event.body) && !m.images.includes(event.body)) {
                  if (event.body.fileName.includes(".jpg") || event.body.fileName.includes(".png") || event.body.fileName.includes(".jpeg")) {
                    if (!m.images || m.images.length === 0)
                      m.images = [];
                    m.images.push(event.body);

                  }
                  else {
                    if (!m.chatFiles || m.chatFiles.length === 0)
                      m.chatFiles = [];
                    m.chatFiles.push(event.body);
                  }
                }
              }
            })

            this.messages.set(this.todayDate, value);


            //   this.message.chatFiles.push(event.body);

            this.preapreMessage();
            this.message.messageId = data.id;
            this.message.chatFiles.push(event.body);

            // sending message file to websocket
            this.webSocketService.sendMessage(MessageMapping.SEND_FILE, this.message);
            console.log(event);

            this.showFiles.forEach(f => {
              if (f.fileName === event.body.fileName) {
                let index = this.showFiles.indexOf(f);
                this.showFiles.splice(index, 1);
                this.msg = "";
              }

            })
          }
        })
      })
    })

  }


  reportProgress(event: HttpEvent<string[] | Blob>, fileName: string) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        //    this.updateStatusCal(event.loaded, event.total!, 'uploading....')
        break;
      case HttpEventType.DownloadProgress:
        //   this.updateStatusCal(event.loaded, event.total!, 'Downloading...')
        break;

      case HttpEventType.Response:
        if (event.body instanceof Array) {
          for (const fileName of event.body) {
            // push in array
          }
        }
        // saveAs(new File([event.body!], fileName,
        //   { type: `${event.headers.get('Content-Type')};charset=utf-8` }

        //  saveAs(new Blob([event.body!],
        //   {type:`${event.headers.get('Content-Type')};charset=utf-8`}),
        //   event.headers.get('File-Name'));
        break;
      default:



    }
  }



  // sending message to topic
  sendMessage() {
    // making message  obj to send on topic
    this.message = new MessageRequest();
    this.message.message = this.msg;

    this.message.sender = this.currentUserId;
    this.message.recipient = this.conversation.user.id;
    this.message.conversationId = this.conversation.conversationId;

    // pushing the message in map array of today date messages
    let value = this.messages.get(this.todayDate) || [];
    value.push(this.message);
    this.message.sent = new Date().toString();
    this.messages.set(this.todayDate, value);

    // sendng the  message
    this.webSocketService.sendMessage(MessageMapping.SEND_MESSAGE, this.message);

    if (this.chatUsers && this.chatUsers.length === 0 || this.chatUsers[0].id !== this.message.recipient)
      this.getConversationUsers();

    this.msg = "";
  }

  // receiving the messages  from the recipient user
  recieveMessage() {
    this.socketObservables.recieveMessage = this.webSocketService.subscribeMessgae(MessageMapping.RECIEVE_MESSAGE + this.conversation.user.id + "/" + this.currentUserId).subscribe((data: any) => {
      let value = this.messages.get(this.todayDate) || [];
      let isPresent = false;
      // checking that message is already present or not
      if (value.length > 0 && value[value.length - 1].id === data.id)
        isPresent = true;
      if (!isPresent)
        value.push(data);

      this.messages.set(this.todayDate, value);
      // mark as seen after reciving message
      this.markAsSeen(this.conversation.user.id);
    });
  }

  // files recieving
  recieveFiles() {
    this.socketObservables.recieveFiles = this.webSocketService.subscribeMessgae(MessageMapping.RECIEVE_FILE + this.conversation.user.id + "/" + this.currentUserId).subscribe((data: any) => {
      //  alert("file mil gai")
      let value = this.messages.get(this.todayDate) || [];
      console.log(data);

      let isPresent = false;
      // pushing the files in the message array
      value.forEach(m => {
        // comaring the messgae id
        if (m.id === data.messageId || m.messageId === data.messageId) {
          // checking if chatFiles is already present or not
          if (!m.chatFiles.includes(data.chatFiles[0]) || !m.images.includes(data.images[0])) {

            // checking this for duplicasy case  with the last message
            if (data.chatFiles && data.chatFiles.length > 0) {
              console.log(m);

              if (m.chatFiles && m.chatFiles.length > 0 && m.chatFiles[m.chatFiles.length - 1].serverFileName !== data.chatFiles[0].serverFileName) {
                m.chatFiles.push(data.chatFiles[0]);
              } else if (!m.chatFiles || m.chatFiles.length <= 0) {
                m.chatFiles = [];
                m.chatFiles.push(data.chatFiles[0]);
              }
            }
            else if (data.images && data.images.length > 0)

              if (m.images && m.images.length > 0 && m.images[m.images.length - 1].serverFileName !== data.images[0].serverFileName) {
                m.images.push(data.images[0]);
              } else if (!m.images || m.images.length <= 0) {
                m.images = [];
                m.images.push(data.images[0]);
              }
            // m.images.push(data.images[0]);
          }
          isPresent = true;
        }
      })
      // pushing the message if not present
      if (!isPresent)
        value.push(data);

      this.messages.set(this.todayDate, value);
      // marking the message as seen
      this.markAsSeen(this.conversation.user.id);
    });

  }

  // getting old conversation of sender and recipient
  getOldMessages() {
    this.messageService.getMessageOfConversationById(this.conversation.conversationId).subscribe((data: any) => {
      this.messages = new Map(Object.entries(data.data));
    })
  }

  afterConversationGet() {
    this.getOldMessages();
    try {
      this.recieveMessage();
      this.statusReceive();
      this.recieveFiles();
      this.checkIsSeen();
      let conversationRequest = new ConversationRequest();
      conversationRequest.senderId = this.currentUserId;
      conversationRequest.recipientId = this.conversation.user.id;
      this.getProfileInfo(conversationRequest);
    } catch (err) {
      console.log(err);
      
         setTimeout(() => {
          this.recieveMessage();
          this.statusReceive();
          this.recieveFiles();
          this.checkIsSeen();
         }, 2000);
    }
  }


  // getting the conversation id of user and the recipient user
  getConversation(recipient: any) {

    this.unSubscribePreviousChat();

    let requst: ConversationRequest = new ConversationRequest();
    requst.senderId = this.authService.getUser().id;
    requst.recipientId = recipient;
    this.setChatUserId(recipient);
    this.conversationService.getConversation(requst).subscribe((data: any) => {
      this.conversation = data.data;
      this.message.conversationId = this.conversation.conversationId;
      // method contains more method calls 
      this.afterConversationGet();
      this.removeTotalChats(recipient);
      try{
      this.markAsSeen(this.conversation.user.id);
      }catch(err){
        setTimeout(() => {
          this.markAsSeen(this.conversation.user.id);
        }, 3000);
      }
      // receiving the status

      this.messages = new Map<any, any[]>;
    }, err => {

      if (err.status == 404) {
        this.conversationService.createConversation(requst).subscribe((data: any) => {
          this.conversation = data.data;

          this.afterConversationGet();
          this.messages = new Map<any, any[]>;
        })
      }
    })
  }

  // setting the recipient id in localstorage to get data on page reload
  setChatUserId(userId: any) {
    localStorage.setItem("chatUser", userId);
  }

  // removing the id from localstorage
  removeChatUserId() {
    localStorage.removeItem("chatUser");
  }

  // if the user is setted
  getChatUserId() {
    let recipientId = localStorage.getItem("chatUser");
    if (recipientId != null && recipientId != undefined)
      this.getConversation(recipientId);
  }

  // update status of  user 
  updateStatus(status: any) {
    this.webSocketService.updateStatus(status, this.currentUserId);
  }

  // receiving the recipient active status
  statusReceive() {
    this.statusSubscibe = this.webSocketService.subscribeMessgae(MessageMapping.STATUS_RECIEVE + "/" + this.conversation.user.id).subscribe((data: any) => {
      this.conversation.user.status = data;
    });
    this.socketObservables.statusRecieve = this.statusSubscibe;
  }

  // marking messages as seen when user opens the chat of recipient
  markAsSeen(recipientId: any) {
    let markAsSeen = new ConversationRequest();
    markAsSeen.senderId = recipientId;
    markAsSeen.recipientId = this.currentUserId;
    this.webSocketService.sendMessage(MessageMapping.MARK_AS_SEEN, markAsSeen);
  }


  // checking messages is seen 
  checkIsSeen() {
    this.socketObservables.checkIsSeen = this.webSocketService.subscribeMessgae(MessageMapping.MARK_AS_SEEN_RECIEVE + this.conversation.user.id).subscribe((data: any) => {
      // messages seen

      if (data.length > 0)
        this.messages.forEach((value, key) => {
          if (data[0].isSeen.includes(key)) {
            value.forEach(v => {
              // upading the messages seen time
              if (v.id === data.messageId && !v.isSeen)
                v.isSeen = data[0].isSeen;
            })
          }
        });
    })
  }

  // updating the recents contacts if someone sends him or he sends to someone
  updateRecents() {
    this.webSocketService.subscribeMessgae(MessageMapping.MESSAGE_PUBLIC_RECIEVE + this.currentUserId).subscribe((data: any) => {

      this.getConversationUsers();
    });
  }

  // getting recent conversation  users
  getConversationUsers() {
    this.conversationService.getConversationUsers().subscribe((data: any) => {
      this.chatUsers = data.data;
      if (this.conversation)
        this.removeTotalChats(this.conversation.user.id);

    })

  }

  //  removing the total unseen messages  count
  removeTotalChats(id: any) {
    this.chatUsers.filter(c => {
      if (c.id === id)
        c.unSeenMessageCount = 0;
    })
  }


  downloadFile(serverFileName: string, fileName: string) {
    this.chatFileService.downloadChatFile(serverFileName).subscribe((event: any) => {
      if (event.type === HttpEventType.Response)
        saveAs(new File([event.body!], fileName,
          { type: `${event.headers.get('Content-Type')};charset=utf-8` }
        ))
    })
  }


  getProfileInfo(conversationRequest:ConversationRequest){
    
    this.chatFileService.getConversationFiles(conversationRequest).subscribe((data:any)=>{

      this.conversationProfile = data;
      console.log(this.conversationProfile);
      
    })
  }

  // unsubscribing the previous user topics
  unSubscribePreviousChat() {
    if (this.socketObservables.checkIsSeen) {
      this.socketObservables.checkIsSeen.unsubscribe();
      this.socketObservables.recieveFiles.unsubscribe();
      this.socketObservables.recieveMessage.unsubscribe();
      this.socketObservables.statusRecieve.unsubscribe();
    }
    this.socketObservables = new ChatMessagesManager();
  }

  isMyFile=false;
  showProfileFiles(isMyFile:any){
    this.isMyFile = isMyFile;   
  }
 
  deleteMessages(id:any){
    let messageIds:MessageDeleteRequest = new MessageDeleteRequest();
    messageIds.messageId.push(id);
    messageIds.deletedById = this.currentUserId;
    this.messageService.deleteMessges(messageIds).subscribe((data:any)=>{
       
    })
  }

}
