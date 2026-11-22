<template>
  <div id="wrapper">
    <!--    动态切换发送者和接收者的样式-->
    <div :class="message.isOwner?'owner':'target'">
      <div class="avatar-wrapper">
        <img :src="message.fromUserAvatar??DefaultAvatar" alt="图片加载失败..." class="avatar">
      </div>
      <div class="content-wrapper">
        <span>{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DefaultAvatar from '@/assets/avatar/user-default.jpg'
//接收父组件传递的参数
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
#wrapper {
  .owner,
  .target {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    box-sizing: border-box;

    .avatar-wrapper {
      font-size: 0;
      flex-shrink: 0;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        object-fit: cover;
      }
    }

    .content-wrapper {
      background: #fff;
      border-radius: 5px;
      padding: 10px;
      min-width: 70px;
      min-height: 40px;
      color: #000;
      font-size: 14px;
      white-space: pre-line;
      box-sizing: border-box;
    }
  }

  .owner {
    flex-direction: row-reverse;

    .content-wrapper {
      background: #95ec69; // 气泡颜色
    }
  }

  .target {
    flex-direction: row;
  }
}
</style>