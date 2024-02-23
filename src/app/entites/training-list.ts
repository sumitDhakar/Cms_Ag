import { Trainers } from "./trainers";
import { TrainingType } from "./training-type";
import { Users } from "./users";

export class TrainingList {

    id=0;
	  trainingType!:TrainingType;
	  trainers!:Trainers;
	  employee!:Users;
	
	  trainerCost=0;
	
	  status='Active';
	
	  startDate!:Date;
	
	  endDate!:Date;
	
	  deleted=false;
	
	  description='';

}
