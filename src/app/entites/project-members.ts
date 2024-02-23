import { Projects } from "./projects";
import { Users } from "./users";

export class ProjectMembers {
    id=0;
    projectId!:Projects;
    userId!:Users;
    isLeader=false;
    deleted=false;
}
