export class OverTimeRequest {

    id=0;


    userId!:number;

    overTimeDate='';

    overTimeHours=0;
    overTimeType='';
    approvedBy!:number;
    description='';

    isDeleted=false;
    status='Pending';
}
