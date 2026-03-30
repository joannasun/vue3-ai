<template>
 <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        :collapse="!isExpand"
        :style="{ width: isExpand ? '200px' : '64px' }"
      >
      <div class="header">
        <div class="h-left">
             <!-- <img src="@/assets/vue.svg" alt="vue图标" /> -->
            <el-image :src="iconUrl" alt="logo" fit="contain" />
        </div>
        <div class="h-right"  :style="{ display: isExpand ? 'block' : 'none' }">
            <h3>AI管理系统</h3>
            <h4>1.0.0</h4>
        </div>
      </div>
      <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
          <el-icon> <component :is="item.meta.icon" /> </el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    
  
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log('router', router)
const iconUrl =new URL('@/assets/vue.svg', import.meta.url).href
import { useAdminStore } from '@/stores/admin'
import { computed } from 'vue'

const adminStore = useAdminStore()

const isExpand = computed(() => adminStore.isExpand)
console.log('isExpand', isExpand.value)
const handleSelect = (key) => {
  console.log(key);
  const currentRoute = router.currentRoute.value
  console.log(currentRoute)
  console.log(router.options.routes[0], key)
  if (currentRoute.path !== key) {
    router.push(key)
  }
}
</script>
<style scoped lang="scss">
.el-menu-vertical-demo{
    height: 100%;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .h-left {
        display: flex;
        align-items: center;
    }
    .h-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

</style>
