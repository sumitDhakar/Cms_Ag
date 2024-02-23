import { Designation } from "./designation";
import { Users } from "./users";

export class PerformanceAppraisal {
      id=0;
	  customerExperience="";
	  marketing="";
	  management="";
	  administration="";
	  presentationSkill="";
	  qualityOfWork="";
	  efficiency="";
	  status ="Active";
	  integrity="";
	  professionalism="";
      teamWork="";
	  criticalThinking="";
	  conflictManagement="";
	  attendance="";
	  abilityToMeetDeadline="";
	  user!:Users;
	   createdAt ='';
  designation!: Designation;
}
