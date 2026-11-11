<template>
  <div id="side-bar-container">
    <!--    头部-->
    <div class="header">
      <!--      头像-->
      <div class="avatar-wrapper flex justify-center items-center">
        <a-avatar :src="avatar" alt="图片加载失败..."/>
      </div>
      <!--      菜单-->
      <div v-for="(item, index) in menuList" :key="index" class="menu" @click="handleNavTo(item.path)">
        <img :src="route.path===item.path?item.iconSelected:item.icon" alt="加载失败..." class="icon">
      </div>
    </div>
    <!--    底部-->
    <div class="footer">
      <SvgIcon color="#ffffff" name="icon-exit"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import avatar from '@/assets/avatar/qute.jpg'
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import Chat from '@/assets/raw-icon/chat.svg'
import ChatFill from '@/assets/raw-icon/chat-fill.svg'
import Contact from '@/assets/raw-icon/contact.svg'
import ContactFill from '@/assets/raw-icon/contact-fill.svg'

interface menuType {
  name: string,
  path: string,
  icon: string,
  iconSelected: string,
}

const route = useRoute();
const router = useRouter();
//菜单数据
const menuList: menuType[] = [
  {
    name: '消息',
    path: '/chat/index',
    icon: Chat,
    iconSelected: ChatFill
  }, {
    name: '联系人',
    path: '/contact/index',
    icon: Contact,
    iconSelected: ContactFill
  }
]
//菜单跳转事件
const handleNavTo: void = (to: string) => {
  router.push({
    path: to
  })
}
</script>
<style lang="scss" scoped>
#side-bar-container {
  width: 80px;
  height: 100%;
  background: #262626;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0; // 上下留出一些呼吸空间
  box-sizing: border-box;

  .header {
    .avatar-wrapper {
      width: auto;
      height: 80px;
      margin: 20px auto;

      :deep(.ant-avatar) {
        width: 50px;
        height: 50px;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .menu {
      display: flex;
      justify-content: center;
      padding: 16px 0;

      .icon {
        width: 32px;
        height: 32px;
      }
    }
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 32px;
  }

}
</style>