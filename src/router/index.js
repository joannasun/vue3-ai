import { createRouter, createWebHistory } from 'vue-router'

const beRoutes= [
    {
        path: '/back',
        redirect:'/back/main',
        component: () => import('@/components/beLayout.vue'),
        children: [
            {
                path: '/back/main',
                component: () => import('@/views/Data.vue'),
                meta: {
                    title: '数据管理',
                    icon: 'Plus'
                }
            },
            {
                path: '/back/knowledge',
                component: () => import('@/views/Knowledge.vue'),
                meta: {
                    title: '知识库管理',
                    icon: 'House'
                }
            },
            {
                path: '/back/record',
                component: () => import('@/views/Record.vue'),
                meta: {
                    title: '记录管理',
                    icon: 'Odometer'   
                }
            },
            {
                path: '/back/log',
                component: () => import('@/views/Log.vue'),
                meta: {
                    title: '日志管理',
                    icon: 'ChatLineSquare'   
                }
            }
        ]
    },
    {
        path: '/auth',
        // redirect: '/auth/login',
        component: () => import('@/components/Authlayout.vue'),
        children: [
            {
                path: '/auth/login',
                component: () => import('@/views/Login.vue'),
                meta: {
                    title: '登录',
                    icon: 'User'
                }
            },
            {
                path: '/auth/register',
                component: () => import('@/views/Register.vue'),
                meta: {
                    title: '注册',
                    icon: 'User'
                }
            }
        ]
    }
  

]

const feRoutes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/components/FeLayout.vue'),
        children: [
            {
                path: '/home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页',
                    icon: 'Home'
                }
            },
            {
            path: 'consult',
            component: () => import('@/views/Consult.vue'),
            meta: {
            title: '咨询',
            icon: 'ChatLineSquare'
           }
           },
           {
            path: 'feKnowledge',
            component: () => import('@/components/FeKonwledge.vue'),
            meta: {
            title: '知识库',
            icon: 'House'
           }
           },
           {
            path: 'emotionLog',
            component: () => import('@/views/EmotionLog.vue'),
            meta: {
            title: '情感日志',
            icon: 'ChatLineSquare'
           }
 }

        ]
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: [...beRoutes, ...feRoutes]
})

router.beforeEach((to, from, next) =>{
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userType = userInfo?.userType || ''
    
    if(token){
        if(userType == 1) {
// 禁止访问后台
      if (to.path.startsWith('/back')) {
        next('/home')
      } else {
        next() // ✅ 允许访问前台页面（首页、知识库等）
      }
        } else if(userType == 2){
             if (to.path.startsWith('/back')){
                next()
             }else {
                next('/back/main')
             }

        } else {
        // 阻止访问后台
    if (to.path.startsWith('/back')) {
      next('/auth/login')
    } else {
      next() // ✅ 允许访问首页、登录、注册
    }
        }
 
    } else {
        if(to.path.startsWith('back')){
            next('/auth/login')
        }else {
            next()
        }
    }

})
export default router
