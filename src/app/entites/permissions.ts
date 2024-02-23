import { Roles } from "./roles";


export class Permissions {

   id=0;
   title:string='';
   isReadable=true;
   isWriteable=true;
   isEditable=true;
   isDeleteable=true;
   role!:Roles;
}
