import { ProjectFiles } from "./project-files";
import { Projects } from "./projects";
import { Tasks } from "./tasks";
import { Users } from "./users";

export class commentsRequestTs {

    id = 0;

    userId!:number;

    projectId!: number;

    taskId!: number;

    fileId!: ProjectFiles[];

    files: any[] = [];

    customerFeedbackId = 0;

    description = '';

    //createdAt: any;

    deleted = false;
    type!:string
}
