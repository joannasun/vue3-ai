<template>
    <div>
        <el-form :model="formData" :inline="true" class="demo-form-inline" ref="ruleFormRef">
           <el-row :gutter="24">
            
           <template v-for="item in formAttrs" :key="item.prop">
            <el-col>
            <el-form-item  :label="item.label" :prop = "item.prop">
                <component 
                    :is="getCom(item.type)" 
                    v-model="formData[item.prop]"
                    v-if="item.type !== 'select'"
                    style="width: 100%"
                />
                <el-select v-else v-model="formData[item.prop]" placeholder="Activity zone" style="width: 240px">
                    <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
                </el-select>
            </el-form-item>
            </el-col>
            </template>
            </el-row>
            <el-row>
                <el-form-item>
                <el-button type="primary" @click="handleSubmit">查询</el-button>
                <el-button type="primary" @click="handleReset(ruleFormRef)">reset</el-button>
               </el-form-item>
            </el-row>
            



        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const formData = reactive({})
const props = defineProps({
    comItems: {
        type: Array,
        default: () => []
    }
})

const getCom = (type) => {
    // 定义映射表（单独抽离，便于维护）
    const componentMap = {
        input: 'el-input',
        select: 'el-select',
        button: 'el-button',
        date: 'el-date-picker'
    }
    // 校验参数 + 设置默认值（避免返回 undefined）
    return componentMap[type] || 'el-input' // 未匹配时默认返回输入框
}
const emit = defineEmits(['submit', 'reset'])

const handleSubmit = () => {
    console.log(formData)
    emit('submit', formData)
}
const handleReset = (formEl) => {
     if (!formEl) return
  formEl.resetFields()
}

const formAttrs = computed(() => {
    const { comItems } = props
    comItems.forEach(item => {
        item.col = { xs: 24, sm: 12, md: 8, lg: 6}
    })
    return comItems
})
</script>
<style scoped lang="scss">
:deep(.el-form){
  
}
:deep(.el-form-item){
}
</style>


