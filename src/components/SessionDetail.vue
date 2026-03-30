<template>
    <el-dialog
        title="咨询会话详情"
        v-model="isVisible"
        width="80%"
        height="70%"
        
    >
    <div class="container">
        <div class="userInfo border">
            <p>用户： {{ sessionDetail.name }}</p>
            <p>开始时间： {{ sessionDetail.time }}</p>
            <p>消息数： {{ sessionDetail.count }}</p>
        </div>
        <div class="record border">
            <p>消息记录：</p>
            <div v-for="(item,idx) in sessionDetail.msg" :key="idx">
                <!-- <div v-if="item.sendType == 1"> -->
                <div class="msg" :style="{backgroundColor: item.senderType == 1 ? 'beige' : 'gainsboro'}">
                    <p>{{item.senderTypeDesc}}{{ item.createdAt }}</p>
                    <p>{{ item.content }}</p>
                </div>

            </div>
        </div>
        <div class="btn">
        <el-button type="primary" size="mini" @click="handleClose">关闭</el-button>
        </div>
    </div>
    
    </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    sessionDetail:{
        type:Object,
        default:()=>{}
    }
})
const emit = defineEmits(['update:visible'])
const isVisible = computed({
    get: ()=>props.visible,
    set: (val) => emit('update:visible', val)
})

const handleClose = ()=>{
    emit('update:visible', false)
}

</script>
<style scoped lang="scss">
.container{
    padding: 10px;
    text-align: left;
    .border, .msg{
        padding: 20px;
        border: 1px solid #eee;
    }
    .record{
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>