<template>
    <div class="container">
        <div class="header" ref="navRef" :class="{isFixed: isNavTop}">
            <div class="img">
                <el-image :src="logo"></el-image>
            </div>
            <div class="title">
                情绪日记
            </div>
        </div>
        <div class="content">
            <div class="rate card">
                <div class="text">今日情绪整体评分</div>
                <p>评分 1-5</p>
                <el-rate
                 v-model="rateVal"
                 :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                 show-text
                 size="large"
                />
            </div>
            <div class="emotion card">
                <div class="text">主要情绪</div>
                <div class="emotionContainer">
                    <div v-for="item in emotionList" :key="item.id" class="emotionItem" @click="handleClick(item.id)" :class="{isSelected: item.id === selectedId}">
                        <el-image :src="item.url"></el-image>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="content card">
                <div class="text">今日情绪描述</div>
               <div style="height: 800px;"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted} from 'vue'

const rateVal = ref()
const selectedId = ref(0)
const isNavTop = ref(false)
const navRef = ref(null)

const logo = new URL('@/assets/vite.svg', import.meta.url)
const emotionList = [ {
    id:1,
    name: '开心',
    url: new URL('@/assets/1.png', import.meta.url)
}, {
    id:2,
    name:'非常开心',
    url: new URL('@/assets/2.png', import.meta.url)
}, {
    id:3,
    name:'兴奋',
    url: new URL('@/assets/3.png', import.meta.url)
}, {
    id:4,
    name:'非常兴奋',
    url: new URL('@/assets/3.png', import.meta.url)
}, {
    id:5,
    name:'高兴',
    url: new URL('@/assets/4.png', import.meta.url)
}, {
    id:6,
    name:'非常高兴',
    url: new URL('@/assets/4.png', import.meta.url)
}, {
    id:7,
    name:'快乐',
    url: new URL('@/assets/4.png', import.meta.url)
}, {
    id:8,
 name:'非常快乐',
    url: new URL('@/assets/4.png', import.meta.url)
}]

const handleClick = (id) => {
    selectedId.value = id
}
let offsetTop = 0
const handleScroll = () => {
    isNavTop.value = window.scrollY >= offsetTop
    console.log(window.scrollY, offsetTop)
}
onMounted(()=>{
    offsetTop = navRef.value.getBoundingClientRect().top
    console.log('onMounted', offsetTop)
    console.log('navRef.value:', navRef.value)
    console.log('navRef.value.getBoundingClientRect():', navRef.value.getBoundingClientRect())

    window.addEventListener('scroll', handleScroll)
    
    // 测试滚动事件
    setTimeout(() => {
        console.log('测试滚动事件，当前scrollY:', window.scrollY)
    }, 1000)
})

onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll)
})
</script>
<style  scoped lang="scss">
.container{
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 140px);
    /* justify-content: flex-start; */
    text-align: left;
    // margin-top: 40px;
    .header{
        height: 100px;
    background: beige;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    font-size: 40px;
    color: #000;
    }
    .isFixed{
        position: fixed;
        top: 0;
    width: 100%;
    z-index: 10;
    /* margin: 0; */
    /* padding: 0; */
    left: 0;
    }
    .content{
        .card{
            border: 1px solid #eee;
    border-radius: 20px;
    background-color: azure;
    margin: 10px;
    padding: 10px;
    .text{
        font-size: 20px;
    color: #000;
    font-family: emoji;
    }
    .emotionContainer{
        display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    padding: 10px;
    .emotionItem{
        width: 23%;
    border: 1px solid red;
    border-radius: 10px;
    padding: 5px;
    background-color: floralwhite;
    cursor: pointer;
    :deep(.el-image){
        width: 50px;
        height: 50px;
    }
    }
    .isSelected{
        background-color: darkorange;
    border: 3px solid #4566;
    }
    }
        }
    }
}
</style>