
<template>
  <div class="common-layout">
    <el-container>
      <el-aside
      >
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header class="header-container">
          <Nav />
        </el-header>
        <el-main class="content-container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import LeftMenu from './LeftMenu.vue'
import Nav from './Nav.vue'


</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content-container {
  flex: 1;
}

/* 精准定位并覆盖 el-header 的 padding */
:deep(.el-header.header-container) {
  padding: 0 !important;
}
:deep(.el-container) {
  height: 100vh;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none; // 直接隐藏滚动条
  }
}
/* 覆盖 el-header 的 CSS 变量，将左右内边距设为 0 */
:deep(.el-header) {
  --el-header-padding: 0 !important;
  --el-header-height: 100px;
}
:deep(.el-aside){
  --el-aside-width: 0
  width: auto;
}
</style>
