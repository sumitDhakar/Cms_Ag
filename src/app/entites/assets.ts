import { Users } from "./users";

export class Assets {

    id=0;
    assetName:any=null;
    isDelete=false;
    assetWarrenty:any=null;
    amount=0;
    serialNumber=0;
    status="Approved";
    description:any=null;
    condition:any=null;
    supplier:any=null;
    model:any=null;
    manufacturer:any=null;
    purchaseDate!:Date;
    purchaseFromDate:any=null;
    assetUser!:Users;


   


}
