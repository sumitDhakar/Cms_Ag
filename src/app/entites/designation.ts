import { Department } from "./department";

export class Designation {
    id=0;
    title='';
    department!:Department;
    users=[];
    isDeleted=false;

 
}
