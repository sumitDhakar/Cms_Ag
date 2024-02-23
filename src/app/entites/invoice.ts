import { Clients } from "./clients";
import { InvoicesItems } from "./invoices-items";
import { Projects } from "./projects";
import { Taxes } from "./taxes";

export class Invoice {


	id = 0;

iId='';
	clientId!: Clients;


	projectId!: Projects;


	billDate :any;


	dueDate :any;
	// colum mtext
	note :any;

	lastEmailSentDate :any;
	// enum
	status :any;

	taxId!: Taxes;
	paidAmount:any=null;
	discount :any= null;
	total :any=null;
	grandTotal:any =null;
	taxCost:any = null;
	discountPercentage:number=0;
	recurring = false;

	recurringInvoiceId:any =null;

	repeatEvery :any=null;
	// enum
	repeatType:any;

	noOfCycles :any;

	nextRecurringDate :any;

	noOfCyclesCompleted =null;

	deleted = false;


	invoicesItems: InvoicesItems[] = [];


}
