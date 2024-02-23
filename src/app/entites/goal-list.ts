import { GoalType } from "./goal-type";

export class GoalList {

    id=0;
    subject='';
    targetAchievement='';
    startDate='';
    endDate='';
    isDelete=false;
     progress=0;
    description='';
    status='';
    goalType!:GoalType;
}
