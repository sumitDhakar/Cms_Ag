import { Tickets } from "./tickets";
import { Users } from "./users";

export class TicketsFiles {

      id:number=0;
	
	  originalName='';
	
	  description='';
	
	  fileSize:number=0; 
	
	  createdAt='';
	
	  ticketsId!:Tickets;
	
	
	  fileName='';
	
	  uploadedBy!:Users;
	 
	  deleted=false;
	
}
