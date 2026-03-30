<template>
   <div class="navBar flex-box">
    <div class="h-left flex-box">
        <el-button @click = adminStore.toggleCollapse>
            <el-icon><Setting /></el-icon>
        </el-button>
        <h3>{{  route.meta.title }}</h3>
    </div>
    <div class="h-right flex-box">
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <el-dropdown>
       <span class="el-dropdown-link">
     user
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click = "handleLogout">logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
   </div>
</template>
<script setup>
import { useAdminStore } from '@/stores/admin'
import { useRoute, useRouter } from 'vue-router';
import { logout } from '@/api/admin'
import { ElMessageBox } from 'element-plus';
import { computed } from 'vue'

const adminStore = useAdminStore()
const route = useRoute()
const router = useRouter()

const handleLogout = async () => {
   ElMessageBox.confirm('确定退出登录吗？', '提示', {
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    logout().then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      router.push('/auth/login')
    })
  })
  
}


</script>
<style scoped lang="scss">
.navBar {
  height: 100px;
  background-color: #f5f5f5;
}
.flex-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
