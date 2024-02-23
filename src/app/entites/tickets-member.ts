import { Tickets } from "./tickets";
import { Users } from "./users";

export class TicketsMember {
      id=0;

	  tickets!:Tickets;

	  followers!:Users;

	  isLeader:Boolean=false;

	  deleted:Boolean = false;
}
