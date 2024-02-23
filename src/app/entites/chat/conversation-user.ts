import { UserStatusResponse } from "src/app/payload/chat/user-status-response";

export class ConversationUser {
    firstName:any;
    lastName:any;
    profileName:any;
    status!:UserStatusResponse;

    unSeenMessageCount=0;
    id:any;
}
