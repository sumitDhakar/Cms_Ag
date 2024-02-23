import { Message } from "./message";

export class ChatFiles {
     fileName='';
	
	 serverFileName='';
	
	message!:Message;
	
	isDeleted=false;

	senderId:any=0;
	recipientId:any=0;

	createdAt:any;
}
