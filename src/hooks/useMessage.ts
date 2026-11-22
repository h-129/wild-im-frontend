//模拟数据
const mockData = [
    {
        id: 284,
        conversationId: 21,
        fromUserId: 1,
        targetUserId: 2,
        fromUserNickname: "萌萌",
        groupId: null,
        fromUserAvatar: "/api/uploads/private/2026/11/18/fba29a47-031d-42d2-a730-6418bb385036.jpg",
        fromUserRemark: null,
        content: "你好呀，瑞萌萌",
        type: "TEXT",
        extra: null,
        duration: null,
        fileName: null,
        fileSize: null,
        fileType: null,
        fileUrl: null,
        thumb: null,
        createTime: "2026-11-22 15:30"
    },
    {
        id: 285,
        conversationId: 21,
        fromUserId: 2,
        targetUserId: 1,
        fromUserNickname: "我",
        groupId: null,
        fromUserAvatar: null,
        fromUserRemark: null,
        content: "在呢，刚调完手机端聊天的弹性布局\n现在试试多类型消息渲染",
        type: "TEXT",
        extra: null,
        duration: null,
        fileName: null,
        fileSize: null,
        fileType: null,
        fileUrl: null,
        thumb: null,
        createTime: "2026-11-22 15:31"
    },
    {
        id: 286,
        conversationId: 21,
        fromUserId: 1,
        targetUserId: 2,
        fromUserNickname: "萌萌",
        groupId: null,
        fromUserAvatar: "/api/uploads/private/2026/11/18/fba29a47-031d-42d2-a730-6418bb385036.jpg",
        fromUserRemark: "萌萌",
        content: null,
        type: "IMAGE",
        extra: {width: 1080, height: 1920},
        duration: null,
        fileName: "mobile-layout.png",
        fileSize: 245760,
        fileType: "image/png",
        fileUrl: "/api/uploads/private/2026/11/22/mobile-layout.png",
        thumb: "/api/uploads/private/2026/11/22/mobile-layout-thumb.png",
        createTime: "2026-11-22 15:32"
    },
    {
        id: 287,
        conversationId: 21,
        fromUserId: 2,
        targetUserId: 1,
        fromUserNickname: "我",
        groupId: null,
        fromUserAvatar: null,
        fromUserRemark: null,
        content: null,
        type: "AUDIO",
        extra: {played: false},
        duration: 8,
        fileName: "voice_287.mp3",
        fileSize: 64200,
        fileType: "audio/mpeg",
        fileUrl: "/api/uploads/private/2026/11/22/voice_287.mp3",
        thumb: null,
        createTime: "2026-11-22 15:33"
    },
    {
        id: 288,
        conversationId: 21,
        fromUserId: 1,
        targetUserId: 2,
        fromUserNickname: "萌萌",
        groupId: null,
        fromUserAvatar: "/api/uploads/private/2026/11/18/fba29a47-031d-42d2-a730-6418bb385036.jpg",
        fromUserRemark: null,
        content: null,
        type: "FILE",
        extra: {ext: "zip"},
        duration: null,
        fileName: "chat-ui-demo.zip",
        fileSize: 1048576,
        fileType: "application/zip",
        fileUrl: "/api/uploads/private/2026/11/22/chat-ui-demo.zip",
        thumb: null,
        createTime: "2026-11-22 15:35"
    }
]
import {useUserStore} from "@/store";


const fetchMessage = () => {
    const userStore = useUserStore();
    const currentUserId = userStore.getUserInfo.id
    mockData.forEach(item => {
        //判断是否是自己发送的消息是的话加一个标记
        item.isOwner = item.fromUserId === currentUserId;
    })
    messageList.value = mockData
}
const messageList = ref([])
export const useMessage = () => {
    fetchMessage()
    return {
        messageList
    }
}