<template>
    <el-dialog
        title="文章详情"
        v-model="dialogVisible"
        width="70%"
    >
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入文章标题" />
            </el-form-item>
             <el-form-item label="文章标签">
                <el-select v-model="form.tags" placeholder="请选择文章标签" multiple filterable allow-create>
                    <el-option v-for="item in tagArr" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
             <el-form-item label="文章摘要" prop="summary">
                <el-input v-model="form.summary" placeholder="请输入文章摘要" />
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="form.categoryId" placeholder="请选择分类">
                    <el-option v-for="item in cateList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="文章封面" prop="coverImage" class = 'cover'>
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :http-request="handleUpload"
                    :on-success="handleAvatarSuccess"
                >
                   <img v-if="form.coverImage" :src="form.coverImage" class="avatar" />
                    
                    <el-button v-else size="small" type="primary">点击上传</el-button>

                </el-upload>
                 <el-button v-if="form.coverImage" size="small" type="primary" @click="form.coverImage = ''"
                    >移除图片</el-button>
            </el-form-item>
            <el-form-item label="文章内容" prop="content" >
                <RichEditor v-model="form.content" 
                placeholder="请输入文章内容"
                :maxCharCount="1000"
                :showWordCount="true"
                @change="handleContentChange"
                @created=" handleEditorCreated"
                /> 
            </el-form-item>
            

        </el-form>

        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref, reactive } from 'vue'
import { uploadImg, addArticle } from '@/api/admin'
import RichEditor from './RichEditor.vue'

const tagArr = ['心里健康', '睡眠', '冥想','运动']
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    cateList:{
        type:Array,
        default:()=>[]
    }
})
const form = reactive({
    title: '',
    categoryId: '',
    summary: '',
    tags: [],
    content: '',
    coverImage: '',
})
const rules = reactive({
    title:[
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    
    categoryId:[
        { required: true, message: '请选择分类', trigger: 'change' }
    ],
    
    content:[
        { required: true, message: '请输入文章内容', trigger: 'blur' }
    ],
})

const emit = defineEmits(['update:visible', 'submit'])

const dialogVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val)
})

const formRef = ref(null)

const handleSubmit = async () => {
    if (!formRef.value) return
    try {
        await formRef.value.validate()
        const articleData = { ...form, tags: form.tags.join(',')}
        console.log('文章表单数据：', articleData)
        const res = await addArticle(articleData)
        console.log('文章表单数据：', res)
        if(res.code == 200){
            ElMessage.success('添加成功')
        }
        // 重置表单
        if (formRef.value) {
            formRef.value.resetFields()
        }
        emit('update:visible', false)
    } catch (error) {
        console.error('表单验证失败：', error)
        ElMessage.error('请填写必填项')
    }
}

const handleCancel = () => {
    emit('update:visible', false)
}


const beforeUpload = file =>{
    const fileType = file.type
    const fileSize = file.size
    if(!['image/jpeg','image/png'].includes(fileType)){
        ElMessage.error('请上传jpg或png格式的图片')
        return false
    }
    if(fileSize > 1024 * 1024 * 12){
        ElMessage.error('图片大小不能超过2MB')
        return false
    }
    return true
}
const handleUpload =async(file) =>{
    console.log(file)
    const uuid = crypto.randomUUID()
    // const res = await uploadImg(file, uuid)
    // console.log(res)
    form.coverImage = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
}
const handleAvatarSuccess = (resizeBy, file) => {

}
const handleContentChange = (val) => {
    form.content =val
    
}
const handleEditorCreated = (editor) => {
    console.log(editor)
}
</script>
<style scoped lang ="scss">
.avatar{
    width: 100px;
}
.cover{
    align-items: start;
}
</style>