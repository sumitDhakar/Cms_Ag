import { Users } from "./users";

export class OverTime {
    id=0;


    userId!:Users;

    overTimeDate='';

    overTimeHours=0;
    overTimeType='';
    approvedBy!:Users;
    description='';

    isDeleted=false;
    status='Pending';
}
