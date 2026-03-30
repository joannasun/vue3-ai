<template>
    <div class="container">
        <div class="top">返回首页</div>
        <div class="content">
            <div class="title">
                <h2>登录你的账户</h2>
                <p>1234557</p>
            </div>
            <div class="form">
                <el-form :model="ruleForm" :rules="rules" ref="formRef">
                      <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
                      </el-form-item>
                </el-form>

            </div>
        </div>
        <div class="footer">
            <p>还没有账户？ <el-button type="primary" @click="register">注册</el-button></p>
        </div>
    </div>

</template>
<script setup>
import { ElMessage } from 'element-plus'
import { login } from "@/api/admin";
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const formRef = ref()

const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const register = () => {
   router.push('/auth/register')

}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid)=>{
    if (valid) {
      const res = await login(ruleForm)
      const { token, userInfo, roleType} = res
      if(!token){
        ElMessage.error(data.msg || '登录失败')
        return
      } else {
        ElMessage.success('登录成功')
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        if(roleType == 2){
            router.push('/back/knowledge')
        } else {
            router.push('/home')
        }
      }
    } else {
      console.log('登录失败')
    }
  })
}
</script>
<style scoped lang="scss">

.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .top{
        cursor: pointer;
        text-align: left;
    }
    .content{
        flex: 1;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form{
        width: 600px;
        padding: 50px
    }
    }
    .footer{
        cursor: pointer;
        left: 0;
    }
}
</style>
