<template>
  <div id="main-container" :style="{backgroundImage:`url(${Bg})`}">
    <div class="wrapper">
      <!--      侧边栏-->
      <SideBar/>
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Bg from '@/assets/background/home-insspirito-abstract.png'
import SideBar from "@/layout/main/SideBar.vue";
</script>
<style lang="scss" scoped>
#main-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  .wrapper {
    width: 85%;
    height: 85%;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: #f5f5f5;
    border: 1px dashed #F4BAA3;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
}
</style>