<template>
   <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header">
            <div class="img">
                <el-image :src="logoImg" alt="logo" style="width: 100px; height: 100px;"/>
                <div class="title">AI助手</div>
            </div>
            <div class="nav">
                <router-link to="/home" class="item" >首页</router-link>
                <router-link v-if="haveToken" to="/consult" class="item" >AI咨询</router-link>
                <router-link v-if="haveToken" to="/emotionLog" class="item" >情绪日志</router-link>
                <router-link to="/feKnowledge" class="item" >知识库</router-link>
                <router-link v-if="!haveToken" to="/auth/login" class="item" >登录</router-link>
                <router-link v-if="!haveToken" to="/auth/register" class="item" >注册</router-link>
                <el-button v-if="haveToken" type="primary" class="item" @click="handleLogout">退出登录</el-button>
            </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>      
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { logout } from '../api/admin';
import { ElMessageBox } from 'element-plus';
const router = useRouter()
const logoImg = new URL('@/assets/hero.png', import.meta.url)
const haveToken = localStorage.getItem('token') // 

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
:deep(.el-header){
  padding: 0;
  height: 100px;
}
:deep(.el-main){
  padding: 0;
}
.header{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: aquamarine;
    .img, .nav{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    .nav .item{
        color: #000;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    &:hover{
        color: aqua;
        text-decoration: underline;
        font-weight: bold;
    }
    }
}
.main{
    display: flex;
    background-color: rgb(126, 202, 176);
    color: rgb(238, 110, 51);
    font-size: 20px;
    width: 100%;
    // min-height: calc(100vh - 120px);
    justify-content: center;
    align-items: center;
    gap: 50px;
    // margin-top: 20px;
    // padding: 20px;
    // overflow: visible;
}
</style>
