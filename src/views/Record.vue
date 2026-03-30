<template>
    <div>
        <PageHeader title="咨询记录">
        </PageHeader>
        <el-table :data="tableData">
            <el-table-column label="绘画ID" prop="userNickname" width="80">
                <template #default="scope">
                    <el-avatar :size="40" >{{  scope.row.userNickname}}</el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="情绪标签" prop="lastMessageContent" >
                <template #default="scope">
                    <h5>{{ scope.row.sessionTitle}}</h5>
                    <p>{{scope.row.lastMessageContent}}</p>
                    
                </template>
            </el-table-column>
            <el-table-column label="消息数" prop="messageCount"  width="80"/>
            <el-table-column label="时间" prop="lastMessageTime"  width="180"/>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.row)"
                    >详情</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            style = "margin-top: 25px"
            layout=" prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.size"
           @change="handleChange"
        ></el-pagination>
        <SessionDetail ref="sessionDetailRef" v-model:visible = "dialogVisible" :sessionDetail="sessionDetail" />
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getRecordList, getSessionDetail } from '@/api/admin'
import SessionDetail from '../components/SessionDetail.vue'

const tableData = ref([])
const dialogVisible = ref(false)
const sessionDetail = ref(null)
const handleDetail = async(row) =>{
    const res = await getSessionDetail(row.userId)
    console.log('session detail',res)
    sessionDetail.value = {
        msg: res,
        name: row.userNickname,
        time: row.lastMessageTime,
        count: row.messageCount
    }
    dialogVisible.value = true
}
const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0,
})
onMounted(async ()=>{
    const res = await getRecordList(pagination)
    tableData.value = res.records
    pagination.total= res.total
})

const handleChange = async (val) => {
    pagination.currentPage = val
    const res = await getRecordList(pagination)
    tableData.value = res.records
    pagination.total= res.total
}
</script>
