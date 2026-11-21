import {ConversationType} from "@/enums/conversationEnum";
import {MessageType} from "@/enums/messageEnum";

/**
 * 最新消息
 * @param type 消息类型
 * @param content 消息内容
 * @param duration 视频/音频时长
 */
export interface LastMessage {
    type: MessageType;
    content?: string;
    senderName?: string; // 群聊发送者名称（如 "张三"）
    duration?: number;   // 语音/视频时长（秒），对应 ImMessage.duration
    fileName?: string;   // 文件名称，对应 ImMessage.fileName
}

/**
 * 会话项
 * @param id 会话id
 * @param name 会话名称
 * @param type 会话类型
 * @param avatar 会话头像
 * @param lastMessage 最新消息
 * @param lastTime 最新消息时间
 * @param unread 未读消息数
 */
export interface ConversationItem {
    id: number,
    name: string,
    type?: ConversationType,
    avatar?: string,
    lastMessage?: LastMessage,
    lastTime?: number,
    unreadCount?: number,
    status?: string;// 会话状态
}