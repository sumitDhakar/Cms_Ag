import { Tickets } from "./tickets";

export class TicketType {
  id=0;
  
	title:any=null;
	
	description:any=null;
	
	 tickets:Tickets[]=[];
	
	 isDeleted=false;

}
