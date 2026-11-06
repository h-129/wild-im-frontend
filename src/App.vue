<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'; // 引入中文语言包
import dayjs from 'dayjs'; // 引入dayjs库
import 'dayjs/locale/zh-cn'; // 引入中文语言包

dayjs.locale('zh-cn');
//定义当前语言为中文
const locale = ref(zhCN)
</script>
