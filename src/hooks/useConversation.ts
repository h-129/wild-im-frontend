import type {ConversationItem} from "@/types/conversation";
import {ConversationType} from "@/enums/conversationEnum";
import {MessageType} from "@/enums/messageEnum";

// 提升为模块级共享状态
const keyword = ref<string>("");
const conversations = ref<ConversationItem[]>([
    {
        id: 1,
        name: "系统消息",
        type: ConversationType.SYSTEM,
        lastMessage: {
            type: MessageType.TEXT,
            content: "你有一条新的好友申请待处理",
        },
        lastTime: "20:08",
        unreadCount: 2,
    },
    {
        id: 1001,
        name: "萌萌",
        type: ConversationType.PRIVATE,
        lastMessage: {
            type: MessageType.TEXT,
            content: "是瑞萌萌耶ovo",
        },
        lastTime: "20:05",
        unreadCount: 9,
    },
    {
        id: 1002,
        name: "前端交流群",
        type: ConversationType.GROUP,
        lastMessage: {
            type: MessageType.TEXT,
            senderName: "张三",
            content: "有人遇到过 Vite 热更新失效吗？",
        },
        lastTime: "19:42",
        unreadCount: 15,
    },
    {
        id: 1003,
        name: "林深",
        type: ConversationType.PRIVATE,
        lastMessage: {
            type: MessageType.TEXT,
            content: "好的，明早九点半会议室见",
        },
        lastTime: "昨天",
        unreadCount: 0,
    },
    {
        id: 1004,
        name: "产品需求评审组",
        type: ConversationType.GROUP,
        lastMessage: {
            type: MessageType.TEXT,
            senderName: "李四",
            content: "最新原型图已经同步到群文件了",
        },
        lastTime: "星期三",
        unreadCount: 1,
    },
    {
        id: 1005,
        name: "设计群",
        type: ConversationType.GROUP,
        lastMessage: {
            type: MessageType.IMAGE,
            senderName: "王五",
        },
        lastTime: "18:20",
        unreadCount: 3,
    },
    {
        id: 1006,
        name: "阿杰",
        type: ConversationType.PRIVATE,
        lastMessage: {
            type: MessageType.VOICE,
            duration: 12,
        },
        lastTime: "17:05",
        unreadCount: 0,
    },
    {
        id: 1007,
        name: "后端研发组",
        type: ConversationType.GROUP,
        lastMessage: {
            type: MessageType.FILE,
            senderName: "赵六",
            fileName: "IM接口文档v1.2.md",
        },
        lastTime: "前天",
        unreadCount: 0,
    },
]);

// 过滤关键字（系统消息置顶排在最前，其余按顺序平铺）
const conversationList = computed<ConversationItem[]>(() => {
    const filtered = !keyword.value
        ? conversations.value
        : conversations.value.filter((item) => {
            const displayName =
                item.type === ConversationType.SYSTEM ? "系统消息" : item.name;
            return displayName.includes(keyword.value);
        });

    // 保证系统消息始终排在列表第一位
    return [...filtered].sort((a, b) => {
        if (a.type === ConversationType.SYSTEM) return -1;
        if (b.type === ConversationType.SYSTEM) return 1;
        return 0;
    });
});

// 新增或更新会话（系统消息自动聚合，普通会话独立平铺）
const upsertConversation = (incoming: ConversationItem) => {
    if (incoming.type === ConversationType.SYSTEM) {
        const systemItem = conversations.value.find(
            (item) => item.type === ConversationType.SYSTEM
        );
        if (systemItem) {
            systemItem.lastMessage = incoming.lastMessage;
            systemItem.lastTime = incoming.lastTime;
            systemItem.unreadCount = (systemItem.unreadCount ?? 0) + 1;
            return;
        }
        conversations.value.unshift({
            ...incoming,
            name: "系统消息",
            unreadCount: incoming.unreadCount ?? 1,
        });
        return;
    }

    // 普通会话（私聊/群聊）：按 id 匹配，没有则作为新会话平铺
    const existingIndex = conversations.value.findIndex(
        (item) => item.id === incoming.id
    );
    if (existingIndex !== -1) {
        const existing = conversations.value[existingIndex];
        existing.lastMessage = incoming.lastMessage;
        existing.lastTime = incoming.lastTime;
        existing.unreadCount = (existing.unreadCount ?? 0) + 1;
    } else {
        conversations.value.push({
            ...incoming,
            unreadCount: incoming.unreadCount ?? 0,
        });
    }
};

// 点击会话时清空未读数
const clearUnread = (conversationId: ConversationItem["id"]) => {
    const target = conversations.value.find((item) => item.id === conversationId);
    if (target) {
        target.unreadCount = 0;
    }
};

// 删除会话（系统消息一般不删除，仅清空未读；普通会话直接移除）
const removerConversation = (conversationId: ConversationItem["id"]) => {
    const index = conversations.value.findIndex(
        (item) => item.id === conversationId
    );
    if (index !== -1) {
        if (conversations.value[index].type === ConversationType.SYSTEM) {
            conversations.value[index].unreadCount = 0;
            return;
        }
        conversations.value.splice(index, 1);
    }
};

export function useConversationList() {
    return {
        keyword,
        conversations,
        conversationList,
        upsertConversation,
        clearUnread,
        removerConversation,
    };
}