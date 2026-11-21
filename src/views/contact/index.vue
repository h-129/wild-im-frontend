<template>
  <div id="contact-container">
    <div class="left">
      <ContactList/>
    </div>
    <div :style="{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.72)), url(${Bg})`}"
         class="right">

    </div>
  </div>
</template>
<script lang="ts" setup>
import Bg from "@/assets/background/bg-contact.png"
</script>
<style lang="scss" scoped>
#contact-container {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: row; // 默认桌面端：左右并排

  .left {
    width: clamp(240px, 25%, 324px);
    background: #efefef;
    flex-shrink: 0; //锁定左侧固定宽度
  }

  .right {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .left {
      width: 100%;
      height: 100%;
    }

    .right {
      display: none;
    }
  }
}
</style>