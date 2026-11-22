<template>
  <div id="conversation-list-container">
    <!-- 工具区域 -->
    <div class="toolbar">
      <div class="search-box">
        <a-input v-model:value="keyword" placeholder="搜索"/>
      </div>
      <a-tooltip title="添加好友">
        <button class="add-btn" type="button">
          <PlusOutlined/>
        </button>
      </a-tooltip>
    </div>

    <!-- 主体区域 -->
    <div class="main-wrapper">
      <div class="conversation-list">
        <div
            v-for="item in conversationList"
            :key="item.id"
            class="conversation-item"
            @click="handleSelectConversation(item)"
        >
          <div class="left">
            <img
                :src="
                item.type === ConversationType.SYSTEM
                  ? IconNotice
                  : item.avatar || avatarDefault
              "
                alt="图片加载失败..."
            />
          </div>
          <div class="right">
            <div class="info">
              <div class="name">
                {{
                  item.type === ConversationType.SYSTEM ? "系统消息" : item.name
                }}
              </div>
              <div class="time">{{ item.lastTime }}</div>
            </div>
            <!-- 最近的一条消息 -->
            <div class="last-message">
              <span>{{ formatLastMessage(item.type, item.lastMessage) }}</span>
            </div>
            <div
                v-if="item.unreadCount && item.unreadCount > 0"
                class="unread-count"
            >
              {{ item.unreadCount > 99 ? "99+" : item.unreadCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PlusOutlined} from "@ant-design/icons-vue";
import IconNotice from "@/assets/raw-icon/notice.svg";
import avatarDefault from "@/assets/avatar/user-default.jpg";
import {ConversationType} from "@/enums/conversationEnum";
import {MessageType} from "@/enums/messageEnum";
import type {ConversationItem, LastMessage} from "@/types/conversation";
import {useConversation} from "@/hooks/useConversation";
import {useRouter} from "vue-router";

const {keyword, conversationList, clearUnread} = useConversation();
const router = useRouter();
// 格式化最近一条消息摘要
const formatLastMessage = (
    convType: ConversationType | undefined,
    msg?: LastMessage
): string => {
  if (!msg) return "";

  let text = "";
  switch (msg.type) {
    case MessageType.TEXT:
      text = msg.content ?? "";
      break;
    case MessageType.IMAGE:
      text = "[图片]";
      break;
    case MessageType.VOICE:
      text = msg.duration ? `[语音 ${msg.duration}"]` : "[语音]";
      break;
    case MessageType.VIDEO:
      text = msg.duration ? `[视频 ${msg.duration}"]` : "[视频]";
      break;
    case MessageType.FILE:
      text = msg.fileName ? `[文件] ${msg.fileName}` : "[文件]";
      break;
    case MessageType.WITHDRAW:
      return msg.senderName
          ? `${msg.senderName} 撤回了一条消息`
          : "撤回了一条消息";
    default:
      text = msg.content ?? "";
  }

  if (convType === ConversationType.GROUP && msg.senderName && text) {
    return `${msg.senderName}：${text}`;
  }
  return text;
};
//实现点击会话切换聊天窗口或系统通知详情面板的功能
const navToDetail = ({id, type}: {
  id: number;
  type?: ConversationType;
}) => {
  router.push({
    path: "/chat/index/detail",
    query: {
      id: id,
      type: type,
    }
  });
}
// 处理选中的会话
const handleSelectConversation = (item: ConversationItem) => {
  //清空未读
  clearUnread(item.id);
  // 后续在这里切换右侧聊天窗口或系统通知详情面板
  navToDetail(item)
};
</script>

<style lang="scss" scoped>
#conversation-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  .toolbar {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    gap: 12px;

    .search-box {
      flex: 1;

      :deep(.ant-input) {
        width: 100%;
      }
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      height: 32px;
      width: 32px;
      padding: 4px;
      background-color: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover,
      &:focus {
        border-color: #4096ff;
      }
    }
  }

  .main-wrapper {
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    .conversation-list {
      .conversation-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 15px;
        gap: 10px;
        cursor: pointer;

        &:hover {
          background: #e0e0e0;
        }

        .left {
          flex-shrink: 0; // 防止 flex 布局下被挤压

          img {
            display: block;
            object-fit: cover;
            width: 40px;
            height: 40px;
          }
        }

        .right {
          min-width: 0;
          flex: 1;
          position: relative;

          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;

            .name {
              font-size: 15px;
              white-space: nowrap; // 防止昵称/群名过长顶掉右侧时间
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .time {
              font-size: 14px;
              color: #666;
              flex-shrink: 0;
            }
          }

          .last-message {
            font-size: 12px;
            color: #777;
            height: 16px;
            padding-right: 26px;
            margin-top: 3px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .unread-count {
            position: absolute;
            right: 0;
            bottom: -3px;
            color: white;
            background-color: red;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>