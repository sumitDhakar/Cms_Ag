import { Users } from "./users";

export class  Clients {
  
	 userImage!:File;
     
     dob:any=null;
     gender:any=null;
       firstName:any=null;

	   lastName:any=null;

	   password:any=null;
        originalName:any = "profileImage";

        profileName :any= "defaultUserImage.png";
    id=0;
    // owner:Users=new Users();
    address:any=null;
    city:any=null;
    companyName:any=null;
    country:any=null;
    createdAt:any;
    currency:any=null;
    currencySymbol:any=null;
    deleted=false;
    disableOnlinePayment:any=null;
    phone:any=null;
    starredBy:any=null;
    state:any=null;
    vatNumber:any=null;
    gstNumber:any=null;
    website:any=null;
    zip:any=null;
    clientGroups:any=null;
    email:any=null;
    status='Active';
    labels:string[]=[];
}
