import { Projects } from "./projects";
import { Users } from "./users";

export class Expenses {


	id = 0;

	expenseDate :any=null;

	description:any=null;

	amount: number = 0;

	originalName :any=null;
	fileName:any=null;
  files:any=null
	// colum text
	title :any=null;


	userId!: Users;

	deleted = false;

	status ="Pending";

	paidBy:any=null;
	expensesFiles: any[] = []

}
