<template>
  <div id="message-panel-container">
    <div class="message-list">
      <!--      历史消息按钮 -->
      <div class="history-btn">
        <span>获取更多历史消息</span>
      </div>
      <!--      消息列表 -->
      <div v-for="(item,index) in messageList" :key="item.id" class="message-item">
        <!--        同一分钟内发送的消息，只显示一个发送时间-->
        <div v-if="item.createTime!==messageList[index-1]?.createTime" class="time">{{ item.createTime }}</div>
        <!--        根据消息类型采用不同的消息组件展示-->
        <component :is="TextMessage" :message="item"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import TextMessage from "@/views/chat/messages/TextMessage.vue";
import {useMessage} from "@/hooks/useMessage";
import {useRoute} from "vue-router";

const {messageList} = useMessage();
const route = useRoute();
const conversationId = Number(route.query.id)
//缓存消息组件
const components = {
  TEXT: TextMessage
}
</script>
<style lang="scss" scoped>
#message-panel-container {
  .message-list {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .history-btn {
      font-size: 14px;
      background-color: #e5e5e5;
      width: 200px;
      text-align: center;
      padding: 10px 0;
      border-radius: 30px;
      margin: 0 auto 20px auto;

      &:hover {
        background-color: #e2e2e2;
        color: #000;
        cursor: pointer;
      }
    }

    .message-item {
      .time {
        font-size: 12px;
        text-align: center;
        color: #000;
        margin-bottom: 8px;
      }
    }
  }
}
</style>