import { Department } from "./department";
import { TerminationType } from "./termination-type";
import { Users } from "./users";

export class Termination {

      id=0;
	
	
	  employee!: Users;
	  terminationType!: TerminationType;
	  terminationDate='';
	  noticeDate='';
	
	  reason='';
	
	  isDelete=false;



}
