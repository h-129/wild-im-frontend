<template>
  <svg :style="{ color: color }" aria-hidden="true" class="svg-icon">
    <use :href="symbolId"/>
  </svg>
</template>
<script lang="ts" setup>
//定义props ，用于接收外部传递的name和color属性
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})
//计算symbolId ，用于绑定svg-icon的use标签的:href属性
const symbolId = computed(() => {
  return `#${props.name}`
})
console.log(symbolId.value)
</script>
<style scoped>
.svg-icon {
  width: 1em; /* 宽度设置为1em 相对于父元素的字体大小 */
  height: 1em; /* 高度设置为1em，与宽度一致 */
  vertical-align: -0.15em; /* 垂直居中对齐 */
  overflow: hidden; /* 隐藏svg-icon的overflow部分 */
}
</style>