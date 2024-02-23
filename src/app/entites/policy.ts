import { Department } from "./department";
import { PolicyFile } from "./policy-file";

export class Policy {

    id=0;
	
	name="";
	
		department!:Department;
	
	 description ="";

	createdAt:any;
	
    isDeleted=false;

    fileData:any[]=[];
	
	files!:PolicyFile[];
}
