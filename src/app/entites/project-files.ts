import { Projects } from "./projects";
import { Users } from "./users";

export class ProjectFiles {
    id=0;

    originalName='';

    description='';

    fileSize=0;

    createdAt:any;

    projectId!:Projects;

    fileName='';

    uploadedBy!:Users;

    deleted=false;

}
