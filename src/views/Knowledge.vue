<template>
    <div>
        <PageHeader title="知识管理">
            <template #buttons>
                <el-button type="primary" @click="isVisible = true">add</el-button>
            </template>
        </PageHeader>
        <ArticleDia v-model:visible="isVisible" :cateList="cateList"  />
        <TableSearch :comItems="comItems" @submit="handleSubmit"
        />
        <el-table :data="tableData" height="250" style="width: 100%">
           <el-table-column prop="id" label="id" width="180" />
           <el-table-column prop="title" label="Name" width="180" />
           <el-table-column prop="categoryId" label="Category">
             <template #default="scope">
                {{categoryMap[scope.row.categoryId]}}
             </template>
           </el-table-column>
           <el-table-column label="操作" >
            <template #default="scope">
                <el-button type="primary" size="mini">add</el-button>
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
            </template>
           </el-table-column>

        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import TableSearch from '@/components/TableSearch.vue'
import { getCateList, getKnowledgeList } from '@/api/admin'
import ArticleDia from '@/components/ArticleDia.vue'
import { addArticle } from '../api/admin'

const isVisible = ref(false)

const tableData = reactive([
    {
        id: 0,
        title: '文章标题',
        categoryId: 1,
    }
]);

const comItems = [
    {
        label: '知识名称',
        type: 'input',
        prop: 'name'
    },
   
    {
        label: '分类',
        type: 'select',
        prop: 'categoryId',
    },
    {
        label: '状态',
        type: 'select',
        prop: 'state',
        options: [{
            label: '草稿',
            value: '0'
        },
        {
            label: '已发布',
            value: '1'
        },
       {
            label: '已下线',
            value: '2'
        }]
    }
]
const handleSubmit = async (formData) => {
    console.log(formData)
    const par = {...pagePar, ...formData}
    const res = await getKnowledgeList(par)
    console.log(res)
}


const cateList = ref([])
const pagePar= reactive({
    currentPage: 1,
    size: 10,
    total: 0
})
const categoryMap = reactive({})
onMounted(async() => {
   const res = await getCateList()
   const res1 = await getKnowledgeList(pagePar)
    console.log(res1)
   console.log(res)
    cateList.value =  res.map(item => {
        categoryMap[item.id] = item.categoryName
    return {
        label: item.categoryName,
        value: item.id
    }
    })
   comItems[1].options = cateList.value
})
</script>
