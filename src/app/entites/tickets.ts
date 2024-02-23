import { Clients } from "./clients";
import { TicketType } from "./ticket-type";
import { TicketsFiles } from "./tickets-files";
import { TicketsMember } from "./tickets-member";
import { Users } from "./users";

export class Tickets {
   id = 0;
   client!: Clients;
   ticketTypeId!: TicketType;
   title :any=null;
   status :any='Open';
   createdBy!: Users;
   createdAt:any=null;
   lastActivityAt:any=null;
   description :any=null;
   requestedBy!: Users;
   labels: any=null;
   deleted = false;
   ticketsFiles:any[]=[];
   ticketMembers:TicketsMember[]=[];

	images:any[]=[];

   files:File[]=[];


}
