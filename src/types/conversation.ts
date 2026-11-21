import {ConversationType} from "@/enums/ConversationEnum";

export interface ConversationItem {
    id: number,
    name: string,
    type?: ConversationType,
    avatar?: string,
    lastMessage?: string,
    lastTime?: string,
    unread?: number,
}