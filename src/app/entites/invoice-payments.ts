import { Invoice } from "./invoice";

export class InvoicePayments {
	  id=0;

	  amount=0;
	
	  paymentDate='';
	
	
	//   paymentMethodId!:PaymentMethods;
	
	  note='';
	
	  status='';
	
	
	  invoiceId!:Invoice;
	
	  deleted=false;
	
	  transactionId='';
	
	  createdBy='';
	
}
