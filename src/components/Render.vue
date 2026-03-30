<template>
  <div class="markdown-content" :class="{ 'ai-message': isAiMessage }">
    <div v-html="renderedContent"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  isAiMessage: {
    type: Boolean,
    default: false
  }
})

// 简单的 Markdown 渲染器
const renderedContent = computed(() => {
  let html = props.content

  // 转义 HTML 标签（防止 XSS）
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 处理代码块 (```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text'
    return `<pre><code class="language-${language}">${code.replace(/\n/g, '<br>')}</code></pre>`
  })

  // 处理行内代码 (`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // 处理标题 (#)
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')

  // 处理粗体 (**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // 处理斜体 (*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // 处理换行
  html = html.replace(/\n/g, '<br>')

  return html
})
</script>

<style scoped lang="scss">
.markdown-content {
  line-height: 1.6;
  word-break: break-word;

  // AI 消息样式
  &.ai-message {
    background-color: #f5f7fa;
    padding: 12px 16px;
    border-radius: 8px;
    margin: 8px 0;
  }

  // 标题样式
  h1, h2, h3 {
    margin: 12px 0 8px;
    font-weight: 600;
  }

  h1 {
    font-size: 22px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  // 代码样式
  code {
    background-color: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
  }

  pre {
    background-color: #2d2d2d;
    color: #fff;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 10px 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }

  // 粗体和斜体
  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }
}
</style>