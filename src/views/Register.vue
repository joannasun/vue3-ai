<template>
    <div class="container">
        <div class="content">
            <div class="title">
                <h2>创建你的账户</h2>
                <p>填写注册信息</p>
            </div>
            <div class="form">
                <el-form :model="ruleForm" :rules="rules" ref="formRef">
                      <el-form-item label="用户名或邮箱" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                      <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" type="number"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="ruleForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">创建用户</el-button>
                      </el-form-item>
                </el-form>

            </div>
        </div>
        <div class="footer">
            <p>有账户？ <el-button type="primary" @click="login">立即登录</el-button></p>
        </div>
    </div>

</template>
<script setup>
import { ElMessage } from 'element-plus'
import { register } from "@/api/user";
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const formRef = ref()

const ruleForm = reactive({
    username: '',
    nickname:'',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 1
})
const pwdValidator = (rule, val, callback) => {
    if (val != ruleForm.password){
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur',validator: pwdValidator }],
    // phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    // nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
})

const login = () => {
   router.push('/auth/login')

}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid)=>{
    if (valid) {
      const res = await register(ruleForm)
      console.log('register',res)
      
      if (res.code == 200){
        ElMessage.success('注册成功')
        router.push('/auth/login')
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
