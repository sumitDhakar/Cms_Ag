import { ProjectFiles } from "./project-files";
import { Projects } from "./projects";
import { Tasks } from "./tasks";
import { Users } from "./users";

export class Comment {
    id = 0;

    createdBy= new Users();

    projectId!: Projects;

    taskId!: Tasks;

    fileId!: ProjectFiles[];

    files: any[] = [];

    customerFeedbackId = 0;

    description = '';

    createdAt!: Date;

    deleted = false;

}
