<template>
    <div class="header">
        <el-row >
            <el-col :offset="3" :span="18">
                <el-menu default-active="1"  class="el-menu-demo menu" mode="horizontal" >
                    <el-menu-item><span class="title">之乎</span></el-menu-item>     
                    <el-menu-item index="1" @click="menu('hotsearch')">首页</el-menu-item>
                    <el-menu-item index="2" @click="menu('topic')">话题</el-menu-item>
                    <el-menu-item index="3" @click="menu('create')">创作</el-menu-item>
                    <el-menu-item index="4" @click="menu('mycenter')">个人中心</el-menu-item>

                    <el-input 
                    v-model="query" 
                    class="search"  
                    style="width:400px;"
                    size="medium"
                    placeholder="搜索问题" 
                    suffix-icon="el-icon-search" >
                    </el-input>

                    <el-button round  
                    type="primary"   
                    @click="search" 
                     size="small" 
                     style="margin-right:3%"
                     > 搜索</el-button>
                     <div class="ad">
                        <i  class="el-icon-bell message" @click="menu('message')"></i>
                        <div id="aa" v-show="isAdvice"></div>
                        <div id="bb" v-show="!isAdvice"></div>
                     </div>
                     <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
                             <i class="el-icon-edit" @click="toChange"></i>
                        </el-tooltip>
                                 <div  class="avatar" @click="open">
                                    <el-avatar  :size="40">
                                        <img  :src="userAvatar"/>
                                        </el-avatar>
                        </div> 
                   
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {searchUser,catAdvice} from '../utils/apiList'
import Changepsw from '../pages/changepsw.vue'
export default {
    name:'Header',
    components:{Changepsw},
    data(){
        return{
            userAvatar:'',//保存用户登录的头像路径
            query:'',//用户输入的搜索条件
            user:[],
            isShow:false,
            isAdvice:false,
        }
    },
    mounted() {
        
         this.$bus.$on('closeChangePsw',data=>{
            this.isShow=data
        })
    
          this.userAvatar = this.$cookie.get('avatar');
          searchUser().then(res=>{
              console.log(res)
              this.user=res

          }).catch(err=>{
              console.log(err)
          })

          this.catIsAdive();//开始先来一次
          //定时任务
          setInterval(()=>{
                if(!this.isAdvice){
                    this.catIsAdive();
                }
          },10000)
          
    },
    methods: {
        toChange(){
            // this.isShow=true
            console.log("准备触发pass");
            this.$bus.$emit("pass",true)
        },
        
        open() {
        this.$alert(
            `<p>昵称：${this.user.nickName}</p>
            <p>粉丝：${this.user.fansCount}</P>
            <p>关注：${this.user.followCount}</P>
            <p>关注：${this.user.thumbUp}</P>        
        `, '我的信息', {
          dangerouslyUseHTMLString: true
        });
      },
        menu(routename){
            this.isAdvice = false;
            this.$router.push({
                name:routename
            })
        },
        search(){
            if(this.query.trim()===""){
                this.$message({
                    message:'搜索内容不能为空',
                    showClose:'true',
                    typr:'warn'
                });
                 return;
            }
            else{
                this.$router.push({
                name:'search',
                query:{
                   query:this.query
                }
            })
            }
        },
        catIsAdive(){
            catAdvice().then(res=>{
                 if(res){
                    this.isAdvice = true;
                 }
             }).catch(err=>{
                 console.log(err)
             })
        },

    }
}
</script>

<style>
    .header{
        box-shadow: 0px 1px 4px rgba(0,0,0,0.3);
        position: -webkit-sticky; 
        position: sticky;  
    }
    .header ,.menu{
        background-color: white;
        height: 60px;
        width:auto;
        line-height: 60px;  
        font-size:20px; 
    }
    .avatar{
        display: inline-block;
        position: relative;
        left:25px;
        top: 12px;
        cursor: pointer;
       
    }
    .title{
        font-size:26px;
        font-weight: bold;
        color:rgb(64,158,255);
    }
    .search{
        margin-left:7%;
        margin-right:1%;  
    }
    .message{
        margin-right: 20px;
    }
    .message:hover{
        cursor: pointer;
    }
    #aa{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: super;
        background-color: red;
        display: inline-block;
        position: relative;
        right: 25px;
        top:-6px;
    }
    #bb{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: super;
        display: inline-block;
        position: relative;
        right: 25px;
        top:-6px;
    }
    .ad{
        display: inline-block;
        
    }
</style>