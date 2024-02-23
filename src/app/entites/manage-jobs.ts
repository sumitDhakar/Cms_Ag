import { Department } from "./department";
import { Designation } from "./designation";

export class ManageJobs {

    id=0;
    jobTitle!:Designation;
    jobLocation='';
    noOfVacancies='';
    experience='';
    age=0;
     noOfViews=0;
	 totalAppliedCandidates=0;

    salaryFrom='';
    salaryTo='';
    jobType='';
    status='';
    startDate:any;
    expiredDate:any;
    description='';
    isDeletd=false;
    department!:Department;
}
