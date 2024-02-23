import { LeaveType } from "./leave-type";
import { Users } from "./users";

export class LeaveApplications {
    id=0;
    startDate:any;
    endDate:any;
    totalHours=0;
    totalDays=0;
    leaveTypeId: LeaveType=new LeaveType();
    applicantId:Users=new Users();
    reason:any;
    createdBy=0;
    createdAt:any;
    checkedBy!:Users
    checkedAt:any;
    status:any;
    deleted=false;

}
