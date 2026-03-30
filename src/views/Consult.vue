<template>
  <div class="container">
    <div class="side">
      <div class="item">
        <el-image
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="100%"
          height="100%"
        ></el-image>
        <p>宁波在线助手</p>
        <p>在线服务中</p>
      </div>
      <div class="item">
        <div class="title">情绪花园</div>
        <div></div>
        <div>
          <el-card>
            <div class="left">
              <el-image :src="emotionImg" fit="100%" height="100%"></el-image>
            </div>
            <div>
              <p>textStyle</p>
            </div>
          </el-card>
        </div>
      </div>
      <div class="item">
        <div class="title">会话历史</div>
        <div class="history" v-if="sessionList.length == 0">暂无会话记录</div>
        <div v-else class="sessionList">
          <div v-for="item in sessionList" :key="item.id" class="textCon" @click = "getDetail(item.id)">
            <div class="text1">
              {{ item.sessionTitle }} - {{ item.lastMessageTime }}
             
              <el-icon type="danger" @click="deleteSession(item.id)" style="position: absolute; right: 0; color: red;"
              ><Delete /></el-icon>
            </div>
            <div class="text1">{{ item.lastMessageContent }}</div>
            <div class="text1">
              <el-icon><Star /></el-icon><i style="margin-right: 20px;">{{ item.messageCount }}</i>
              <el-icon><Timer /></el-icon><i>{{ item.durationMinutes }}分钟</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="left">AI 助手</div>
        <div class="right">
          <el-button type="primary" circle>+</el-button>
        </div>
      </div>
      <div class="content">
        <div v-if="msgs.length == 0" class="onePiece">
          <el-avatar :icon="UserFilled" />
          <div class="right">
            <div class="text">
              欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎欢迎123456779
            </div>
            <div class="date">刚刚</div>
          </div>
        </div>
        <div v-else >
          <div v-for="item in msgs" :key="item.id" class="onePiece">
            <el-avatar v-if="item.senderType == 1" :icon="UserFilled" />
            <el-avatar v-if="item.senderType == 2" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>

            <div class="right">
              <div class="text">
                <div v-if="item.senderType == 2 && isAiTyping && !item.content">...</div>
                <div v-if="item.senderType == 2 && isAiTyping">正在输入中</div>
                <Render v-if="item.senderType == 2 &&! item.isError" :content="item.content" :isAiMessage = "item.senderType ==2"></Render>
                <div  v-if="item.senderType == 1 || (item.senderType == 2 && item.isError)">{{ item.content }}</div>
              </div>
              <div class="date">{{ item.createdAt }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="f-content">
          <el-input
            placeholder="请输入"
            v-model="userMsg"
            type="textarea"
            :rows="3"
            :disabled="isAiTyping"
            clearable
            @keydown="handleKeydown"
            resize="none"
            :maxlength="200"
          />
          <div class="text">
            <p>按enter发送， shift+enter 换行</p>
            <p>{{userMsg.length}}/200</p>
          </div>
        </div>
        <el-button @click="addMsg">
          <el-icon><Position /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { UserFilled,  } from "@element-plus/icons-vue";
import { createSession, getStream, getSessionList, delSession, getSessionDetailList, getSessionResultList } from "@/api/user";
import Render from "@/components/Render.vue";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import dayjs from 'dayjs'

const emotionImg = new URL("@/assets/vite.svg", import.meta.url);
const msgs = ref([]);
const userMsg = ref("");
const isAiTyping = ref(false);
const sessionList = ref([]);
onMounted(() => {
  getSList()
  
})
const getDetail = async (id) =>{
  const res1 = await getSessionDetailList(id);
  msgs.value = res1 || []
  // const res2 = await getSessionResultList(id)
  console.log('res1', res1)
  
}
const handleKeydown = (e) => {
  if (e.key == "ENTER") {
    addMsg();
  }
};
const deleteSession = async (id) =>{
  const res =await delSession (id)
  console.log('del', res)
  if(res){
    getSList()
  }

}
const getSList = async()=>{
  const sessionData = await getSessionList();
  sessionList.value = sessionData?.records || [];
  console.log("sessionList", sessionList.value);
}
const addMsg = async () => {
  const res = await createSession({
    sessionTitle: "AI 助手 2026",
    initialMessage: userMsg.value,
    sessionId: 'session_4265'
  });
  console.log("add", res);
  const { sessionId,initialMessage, startTime } = res;
  msgs.value.push({
    senderType:1,
    content: initialMessage,
    sessionId: sessionId,
    createdAt: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
  },
{
        senderType: 2,
        content: '',
        isError: false,
        sessionId: sessionId,
   

      })
  isAiTyping.value = true;

  userMsg.value = ''
      console.log('aimsg1', msgs.value)
  const ctrl =new AbortController()
  fetchEventSource('/api/psychological-chat/stream',{
    method:'POST',
    headers:{
      'Token': localStorage.getItem('token'),
      'Accept': 'text/event-stream',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      sessionId,
      userMessage: initialMessage
    }),
    signal: ctrl.signal,
    onopen: (res)=>{
      console.log('open', res)
      if(res.headers.get('Content-Type') != 'text/event-stream'){
        console.log('text/event-stream', res)
        ctrl.abort()
      }
      
    },
    onmessage: (event)=>{
      const raw = event.data.trim()
      if(!raw) return
      const eventName = event.event;

      

      if(eventName == 'done'){
        ctrl.abort()
        isAiTyping.value = false
         msgs.value[msgs.value.length - 1].createdAt = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
        return
      } 
      const payload = JSON.parse(raw)
      if(payload.code == '200' && payload?.data?.content){
        msgs.value[msgs.value.length - 1].content += payload.data.content
        // console.log('aimsg', msgs.value)
      } else {
        msgs.value[msgs.value.length - 1].isError = true
        msgs.value[msgs.value.length - 1].content ='ai fail'
      }
        isAiTyping.value = false
    },
    onerror: (err) => {
      throw err
    },
    onclose: (event) => {
      // todo
    }
  })
  //     //     sessionId,
  //     userMessage: userMsg.value
  // })
  // console.log('stream', streamRes)
  isAiTyping.value = false;
  getSList()


};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex: 1;
  flex-direction: row;
  // width: calc(100% - 60px);
  height: calc(100vh - 140px);
  padding: 20px;
  overflow: hidden;
  .side {
    width: 350px;
    height: 100%;
    background-color: #e5c98b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    .item {
      height: 32%;
      border: 1px solid red;
      border-radius: 20px;
      padding: 10px;
      .title {
        color: #000;
        text-align: left;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .sessionList {
        width: 100%;
        height: calc(100% - 30px);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none; // 直接隐藏滚动条
        }
        .textCon {
          background: rgba(255,255,255,0.3);
          border-radius: 5px;
          margin-bottom: 10px;
          padding: 8px;
          cursor: pointer;
          &:hover {
            background: rgba(255,255,255,0.5);
          }
          .text1 {
            position: relative;
            color: #000;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 1.4;
            font-size: 14px;
            text-align: left;
            i{
              font-size: 16px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    :deep(.el-image) {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    border: 1px solid pink;
    border-radius: 20px;
    background-color: rgb(198, 220, 240);
    .header {
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: wheat;
      border-radius: 20px;
    }
    .content {
      flex: 1;
      overflow: scroll;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none; // 直接隐藏滚动条
      }
      .onePiece {
        display: flex;
        flex-direction: row;
        padding: 10px;
        gap: 10px;
        text-align: left;
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
    .footer {
      height: 150px;
      display: flex;
      flex-direction: row;
      gap: 10px;
      padding: 10px;
      .f-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        :deep(.el-input) {
          flex: 1;
        }
        .text {
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
      :deep(.el-button) {
        width: 50px;
        height: 50px;
        font-size: 30px;
        margin-top: 30px;
      }
    }
  }
}
</style>
