<template>
   <div>
    <div class="top">
        <el-row>
            <el-col :span="6">
                <el-card body-class ="card">
                    <div class="left">
                        <el-image :src="userImg" fit="100%" height="100%"></el-image>
                    </div>
                    <div class="right">
                         <div>总用户数：</div>
                         <div>{{ anaData?.systemOverview?.totalUsers }}</div>
                         <div>活跃用户数： {{ anaData?.systemOverview?.activeUsers }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card body-class ="card">
                    <div class="left">
                        <el-image :src="userImg" fit="100%" height="100%"></el-image>
                    </div>
                    <div class="right">
                         <div>情绪日志：</div>
                         <div>{{ anaData?.systemOverview?.totalUsers }}</div>
                         <div>活跃用户数： {{ anaData?.systemOverview?.activeUsers }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card body-class ="card">
                    <div class="left">
                        <el-image :src="userImg" fit="100%" height="100%"></el-image>
                    </div>
                    <div class="right">
                         <div>咨询绘画</div>
                         <div>{{ anaData?.systemOverview?.totalUsers }}</div>
                         <div>活跃用户数： {{ anaData?.systemOverview?.activeUsers }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card body-class ="card">
                    <div class="left">
                        <el-image :src="userImg" fit="100%" height="100%"></el-image>
                    </div>
                    <div class="right">
                         <div>平均情绪</div>
                         <div>{{ anaData?.systemOverview?.totalUsers }}</div>
                         <div>活跃用户数： {{ anaData?.systemOverview?.activeUsers }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
    <div class="chart">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
                <el-card body-class ="card">
                    <template #header>
                        <div class="header" style="display: flex;">

                        <div>总会话数：
                            {{  anaData?.consultationStats?.totalSessions}}
                        </div>
                        <div>平均时长
                             {{ anaData?.consultationStats?.avgDuration }} 秒
                        </div>
                        <div>
                            活跃用户：
                            {{  anaData?.systemOverview?.activeUsers}}
                        </div>
                        </div>

                    </template>
                    <div class="chart-content" ref="conRef" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card body-class ="card">
                    <template #header>
                        <div>情绪日志分析</div>
                    </template>
                    <div class="chart-content" ref="emotionRef" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card body-class="card">
                    <template #header>
                        <div>用户活跃度趋势</div>
                    </template>
                    <div class="chart-content" ref="userRef" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
   </div>
</template>
<script setup>
import { ref, reactive, computed , onMounted} from 'vue'
import { getAnaData } from '@/api/admin'
import * as echarts from 'echarts'

const anaData = ref()
const emotionRef = ref()
const conRef = ref()
const userRef = ref()
let conChart = null
let emotionChart = null
let userChart = null
const userImg = new URL('@/assets/vite.svg', import.meta.url)
onMounted(async() => {
    const res = await getAnaData()
    anaData.value = res
    console.log(anaData.value)
    // 使用 nextTick 确保 DOM 完全渲染
    setTimeout(() => {
        initEmChart()
        initConchart()
        initUserChart()
    }, 100)
})
const initUserChart = ()=>{
    if(!userRef.value) return
    
    // 检查元素尺寸
    const rect = userRef.value.getBoundingClientRect()
    if(rect.width === 0 || rect.height === 0) {
        console.warn('DOM 元素尺寸为 0，稍后重试')
        setTimeout(() => {
            initUserChart()
        }, 100)
        return
    }
    
    if(userChart) userChart.dispose()
    
    userChart = echarts.init(userRef.value)
    userChart.setOption({
        title:{
            text: '用户活跃度趋势',
            TextStyle:{
                fontSize: 16,
                color: 'red'
            }
        },
  tooltip: {
   borderColor: '#887723',
   borderWidth: 1,
   textStyle: {
    color: 'blue'
   }
  },
  legend: {
    data: ['活跃用户','新增用户','日记用户', '咨询用户'],
    top: 40
  },
 

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: anaData.value?.userActivity?.map(item => item.date) || []
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      name: '活跃用户',
      smooth: true,
      color:'green',
      data: anaData.value?.userActivity?.map(item => item.activeUsers) || []
    },

    {
      type: 'line',
      name: '新增用户',
      smooth: true,
      color:'yellow',
      data: anaData.value?.userActivity?.map(item => item.newUsers) || []
    },
    {
      type: 'line',
      name: '日记用户',
      smooth: true,
      color: 'purple',
      data: anaData.value?.userActivity?.map(item => item.diaryUsers) || []
    },

    {
      type: 'line',
      name: '咨询用户',
      smooth: true,
      color:'red',
      data: anaData.value?.userActivity?.map(item => item.consultationUsers) || []
    }
    ]
    })
    
    // 添加窗口 resize 事件，确保图表响应式
    window.addEventListener('resize', () => {
        if(conChart) conChart.resize()
    })
}
const initConchart = ()=>{
    if(!conRef.value) return
    
    // 检查元素尺寸
    const rect = conRef.value.getBoundingClientRect()
    if(rect.width === 0 || rect.height === 0) {
        console.warn('DOM 元素尺寸为 0，稍后重试')
        setTimeout(() => {
            initConchart()
        }, 100)
        return
    }
    
    if(conChart) conChart.dispose()
    
    conChart = echarts.init(conRef.value)
    conChart.setOption({
        title:{
            text: '咨询活动统计',
            TextStyle:{
                fontSize: 16,
                color: 'yellow'
            }
        },
  tooltip: {
   borderColor: '#887723',
   borderWidth: 1,
   textStyle: {
    color: 'blue'
   }
  },
  legend: {
    data: ['会话数量','参与用户数'],
    top: 40
  },
 

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: anaData.value?.consultationStats?.dailyTrend?.map(item => item.date) || []
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      name: '会话数量',
      smooth: true,
      data: anaData.value?.consultationStats?.dailyTrend?.map(item => item.sessionCount) || []
    },

    {
      type: 'bar',
      name: '参与用户数',
      smooth: true,
      color:'red',
      data: anaData.value?.consultationStats?.dailyTrend?.map(item => item.userCount) || []
    }
    ]
    })
    
    // 添加窗口 resize 事件，确保图表响应式
    window.addEventListener('resize', () => {
        if(conChart) conChart.resize()
    })
}
const initEmChart = ()=>{
    if(!emotionRef.value) return
    
    // 检查元素尺寸
    const rect = emotionRef.value.getBoundingClientRect()
    if(rect.width === 0 || rect.height === 0) {
        console.warn('DOM 元素尺寸为 0，稍后重试')
        setTimeout(() => {
            initEmChart()
        }, 100)
        return
    }
    
    if(emotionChart) emotionChart.dispose()
    
    emotionChart = echarts.init(emotionRef.value)
    emotionChart.setOption({
        title:{
            text: '情绪日志分析',
            TextStyle:{
                fontSize: 16,
                color: '#333'
            }
        },
  tooltip: {
   borderColor: '#887723',
   borderWidth: 1,
   textStyle: {
    color: 'pink'
   }
  },
  legend: {
    data: ['平均情绪评分','记录数量'],
    top: 40
  },
 

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: anaData.value?.emotionTrend?.map(item => item.date) || []
  },
  yAxis: {
    type: 'value',
    name: '平均情绪评分'
  },
  series: [
    {
      type: 'line',
      name: '平均情绪评分',
      smooth: true,
      data: anaData.value?.emotionTrend?.map(item => item.avgMoodScore) || []
    },

    {
      type: 'line',
      name: '记录数量',
      smooth: true,
      data: anaData.value?.emotionTrend?.map(item => item.recordCount) || []
    }
    ]
    })
    
    // 添加窗口 resize 事件，确保图表响应式
    window.addEventListener('resize', () => {
        if(emotionChart) emotionChart.resize()
    })
}
        
</script>
<style scoped lang="scss">
:deep(.el-col-6){
    padding: 5px;
}
:deep(.el-card__body.card){
    display: flex;
    align-items: center;
    .left{
        width: 50%;
        height: 100%;
    }
    .right div{
        font-size: 14px;
    }
}
</style>
