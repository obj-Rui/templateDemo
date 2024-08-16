<template>
  <div class="div">
    <button @click="a">请求</button>
  </div>
</template>
<script lang="ts" setup>
import { get } from '@/http/index'
async function a() {
  const as = await get('https://brssp.ibreader.com/js/apps/102/code?posId=1023')
  console.log('[ as ]-10', as)
  return as
}
</script>

<style lang="less" scoped></style>
