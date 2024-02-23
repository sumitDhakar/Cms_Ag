import { Clients } from "./clients";
import { Designation } from "./designation";
import { UserRoles } from "./user-roles";
import { UserTypes } from "./user-types";

export class Users {
    id=0;
      firstName!:string;
	  firstNames!:string;
      lastName:any=null;
	  

	  isAdmin=false;

	  email:any=null

	 password:any=null;
	  originalName:any=null;
	
	 profileName:any=null;


	 status:any=null;


	 messageCheckedAt:any=null;

	 notificationCheckedAt:any=null;

	 isPrime=false;

	jobTitle:any=null;


	disableLogin=false;

	 note:any=null;


	 alternativeAddress:any=null;

	 phone:any=null;

	
	address:any=null;


	 alternativePhone:any=null;


	 dob:any;

	ssn:any=null;


	 gender:any=null;

	
	 stickyNote:any=null;

	
	skype:any=null;


	enableWebNotification=false;

	 enableEmailNotification=false;

	 createdAt:any;

	 deleted=false;
 
	 userRoles!:UserRoles[];
	 
	 designation!:Designation;

	 userImage!:File;

	 constructor(){
		this.id=0
	 }
}
