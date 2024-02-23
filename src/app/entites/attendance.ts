import { Users } from "./users";

export class Attendance {
    id=0;
    status='';
    userId:Users=new Users();
    attendanceStatus='Incomplete';
    inTime:any;
    outTime:any;
    checkedBy!:Users;
    note='';
    checkedAt:any;
    rejectReason='';
    deleted=false;
    totalTime:any;
    firstIn='';
    lastOut='';


}
