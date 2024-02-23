import { Designation } from "./designation";
import { Users } from "./users";

export class Promotion {
	public  id=0;

	public  employee= new Users();

	public  designationTo=new Designation();

	public  designationFrom='';

	public  promotionDate='';



	public  isDeleted=false;
}
