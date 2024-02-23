import { Users } from "../users";
import { ChatFiles } from "./chat-files";
import { Conversation } from "./conversation";

export class Message {
    sender!: Users;

    recipient!: Users;

    message = '';

   conversationId='';

    seen: any;

    isDeleted = false;

    sent: any;

    recieved: any;

    chatFiles: ChatFiles[] = [];
    isSenderDeleted=false;
    isRecipientDeleted=false;
}
