
export class TicketRequest {


    id=0;
    clientId!:number;
    ticketTypeId!:number;
    title:any=null;
    status:any=null;
    createdBy!:number;
    createdAt:any=null;
    lastActivityAt:any=null;
    description:any=null;
    assigned!:number;
    requestedBy!:number;
    followers:number[]=[];
    labels:any=null;
    deleted=false; 
    files:File[]=[];
     ticketsFiles:any[]=[];
 
}
