<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 200px; overflow-y: hidden;"
        v-model="localValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>
<script setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css

  import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    maxCharCount: {
      type: Number,
      default: 0
    },
    showWordCount: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'change', 'created'])

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()

  // 本地值
  const localValue = ref(props.modelValue || '')

  // 监听 prop 变化
  // watch(() => props.modelValue, (newValue) => {
  //   if (newValue !== localValue.value) {
  //     localValue.value = newValue
  //   }
  // })

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: props.placeholder,
    maxLength: props.maxCharCount,
    showWordCount: props.showWordCount
  }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    emit('created', editor)
  }

  const handleChange = (editor) => {
    const html = editor.getHtml()
    localValue.value = html
    emit('update:modelValue', html)
    emit('change', html)
  }
</script>