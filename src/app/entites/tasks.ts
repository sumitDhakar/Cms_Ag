import { Projects } from "./projects";
import { TaskMembers } from "./task-members";
import { Users } from "./users";

export class Tasks {


	id = 0;

	title = '';

	description = '';

	Tasklabels: string[] = [];
	 

	deleted = false;
	
	startDate = '';
	relatedTo: any;

	deadline = '';
	// enum
	status = '';

	points = '';

	projectId!: Projects;


	taskMembers:TaskMembers[]=[];

	 assignedHours=0;
	
	 remaningHours=0;
}
