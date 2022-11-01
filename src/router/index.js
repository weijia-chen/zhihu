
import VueRouter from "vue-router"
import Vue from 'vue'


import { Message  } from "element-ui"
import Follow from '../pages/follow'
import Hotsearch from '../pages/hotsearch'
import Home from '../components/home'
import Create from '../components/create'
import Drafts from '../pages/drafts'
import Writequestion from '../pages/writequestion'
import Answerquestion from '../pages/answerquestion'
import Login from '../pages/login'
import Register from '../pages/register'
import HomeMenu from '../components/homeMenu'
import Search from '../pages/search'
import Problemdetail from '../pages/problemdetail'
import Messages from '../pages/message'
import MyCenter from '../components/myCenter'
import Mycollect from '../pages/mycollect'
import Myquestion from '../pages/myquestion'
import Myreply from '../pages/myreply'
import MyFollowUser from '../pages/myFollowUser'
import MyFollowTopic from '../pages/myFollowTopic'
import MyFollowQuestion from '../pages/myFollowQuestion'
import Problemlist from '../pages/problemlist'
import Topic from '../pages/topic'
import Favspro from '../pages/favsPro'
import TopicMessage from '../pages/TopicMessage'
import ProblemMessage from '../pages/problemMessage'

Vue.use(VueRouter)



const router=new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            meta:{title:'之乎-登录',isAuth:true},
            component:Login
        },
        {
            path:'/',
            meta:{title:'之乎-登录',isAuth:true},
            component:Login
        },
        {
            name:'register',
            path:'/register',
            meta:{title:'之乎-注册',isAuth:true},
            component:Register
        },
        {
            name:'zhihu',
            path:'/zhihu',
            meta:{title:'之乎'},
            component:Home,
            /*子路由路径不用加斜杠 */
            children:[
                {
                    name:'search',
                    path:'search',
                    mate:{title:'之乎-搜索'},
                    component:Search,
                    props($route){
                        return {
                            query:$route.query.query,
                        }
                    } 
                },
                {
                    name:'home',
                    path:'home',
                    meta:{title:'之乎首页'},
                    component:HomeMenu,
                    children:[
                        {
                            name:'follow',
                            path:'follow',
                            meta:{title:'关注的人动态'},
                            component:Follow,
                        },
                        {
                            name:'topicMessage',
                            path:'topicMessage',
                            meta:{title:'关注的话题动态'},
                            component:TopicMessage,
                        },
                        {
                            name:'problemMessage',
                            path:'problemMessage',
                            meta:{title:'关注的问题动态'},
                            component:ProblemMessage,
                        },
                        {
                            name:'hotsearch',
                            path:'hotsearch',
                            meta:{title:'热搜'},
                            component:Hotsearch 
                        }
                    ]
                }, 
                {
                    name:'create',
                    path:'create',
                    meta:{title:'创作'},
                    component:Create,
                    children:[
                        {
                            name:'writequestion',
                            path:'Writequestion',
                            meta:{title:'写问题'},
                            component:Writequestion
                        },
                        {
                            name:'drafts',
                            path:'drafts',
                            meta:{title:'草稿箱'},
                            component:Drafts,
                            children:[
                                {
                                    name:'updateDraft',
                                    path:'updateDraft',
                                    meta:{title:'草稿箱'},
                                    component:Answerquestion
                                }
                            ]
                        },
                        
                        {
                            name:'answerquestion',
                            path:'answerquestion',
                            meta:{title:'回答问题'},
                            component:Answerquestion
                        },
                    ]
                },
                {
                    name:'problemdetail',
                    path:'problemdetail',
                    meta:{title:'之乎-问题详情'},
                    component:Problemdetail,
                    children:[
                        {
                            name:'replyProblem',
                            path:'replyProblem',
                            component:Answerquestion
                        }
                    ]
                },
                {
                    name:'message',
                    path:'message',
                    meta:{title:'之乎-消息'},
                    component:Messages
                },
                {
                    name:'mycenter',
                    path:'mycenter',
                    meta:{title:'之乎-个人中心'},
                    component:MyCenter,
                    children:[
                        {
                            name:'mycollect',
                            path:'mycollect',
                            meta:{title:'之乎-我的收藏'},
                            component:Mycollect
                        },
                        {
                            name:'myquestion',
                            path:'myquestion',
                            meta:{title:'之乎-已发布问题'},
                            component:Myquestion
                        },
                        {
                            name:'myreply',
                            path:'myreply',
                            meta:{title:'之乎-我的回答'},
                            component:Myreply
                        },
                        {
                            name:'myfollowuser',
                            path:'myfollowuser',
                            meta:{title:'之乎-关注的人'},
                            component:MyFollowUser
                        },
                        {
                            name:'myfollowquestion',
                            path:'myfollowquestion',
                            meta:{title:'之乎-关注的问题'},
                            component:MyFollowQuestion
                        },
                        {
                            name:'myfollowtopic',
                            path:'myfollowtopic',
                            meta:{title:'之乎-关注的话题'},
                            component:MyFollowTopic
                        },{
                            name:'favspro',
                            path:'favspro',
                            meta:{title:'之乎-收藏夹详情'},
                            component:Favspro
                        }
                    ]

                },
                {
                    name:'problemlist',
                    path:'problemlist',
                    meta:{title:'之乎-话题问题列表'},
                    component:Problemlist
                },
                {
                    name:'topic',
                    path:'topic',
                    meta:{title:'之乎-话题'},
                    component:Topic
                }
            ]   
        }
    ]
})
//处理跳转同一路由，出现警告
const originalPush =VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
    return originalPush.call(this,location).catch(err => err)
}

//全局前置路由守卫————初始化、每次切换之前被调用
router.beforeEach((to,from,next)=>{
    if(!to.meta.isAuth&&!Vue.prototype.$cookie.get('userTicket')){//判断是否需要鉴权以及用户是否登录
         Message.error({message:'尚未登录，请登录'})
         return;
    }
      next();
   
       
   
    
   
})


//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from)=>{
    document.title = to.meta.title||'之乎'
    localStorage.setItem("new",to.path)


	
})

export default router 