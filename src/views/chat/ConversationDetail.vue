<template>
  <div id="conversation-detail-container">
    <div class="header-wrapper">
      <div class="left">
        <span>{{ title }}</span>
      </div>
      <div class="right">
        <EllipsisOutlined :style="{fontSize: '24px',color: '#333'}"/>
      </div>
    </div>
    <MessagePanel class="message-panel"/>
    <MessageInput class="message-input"/>
  </div>
</template>
<script lang="ts" setup>
import MessagePanel from "@/views/chat/MessagePanel.vue";
import MessageInput from "@/views/chat/MessageInput.vue";
import {EllipsisOutlined} from "@ant-design/icons-vue";
import {useRoute} from "vue-router";
import {useConversation} from "@/hooks/useConversation";

const {conversationList} = useConversation();
const route = useRoute();
//根据当前路由参数传递过来的会话id来进行查询显示顶部标题
const title = computed(() => {
  const currentTargetId = Number(route.query.id)
  //如果匹配到就返回命中的第一个数组
  const matched = conversationList.value.find((conversation) => conversation.id === currentTargetId)
  if (!matched) {
    return ""
  }
  return matched.name
})

</script>
<style lang="scss" scoped>
#conversation-detail-container {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  .header-wrapper {
    width: 100%;
    flex: 0.8 1 0;
    min-height: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid red;

    .left {

    }

    .right {
      cursor: pointer;
    }
  }

  .message-panel {
    flex: 6 1 0;
    min-height: 0;
    overflow-y: auto;
    border: 1px solid red;
  }

  .message-input {
    flex: 2.2 1 0;
    min-height: 0;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .header-wrapper {
      flex: 0.8 1 0;
      padding: 0 12px;
    }

    .message-panel {
      flex: 6.2 1 0;
    }

    .message-input {
      flex: 3 1 0;
    }
  }
}
</style>