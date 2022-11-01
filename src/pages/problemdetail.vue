<template>
<div class="whole">
    <div class='main'>
        <el-row >
            <el-col :offset="4" :span="15">
                <h2  style="font-size:24px;font-weight:bold;margin-top:10px;margin-bottom:20px;">{{problem.title}}
                    <span class="browse">浏览量{{problem.visits}}</span>
                    <i class="el-icon-thumb browse"></i>
                    </h2>
                
                <p style="margin-bottom:20px;">{{problem.content?problem.content:'该用户未对问题进行描述'}}</p>

                 <el-button type="primary" @click="follow">{{problem.pay?'已关注':'关注'}}</el-button>
                 <el-button icon="el-icon-edit" style="color:blue" @click="write">写回答</el-button>
                 <span class="follow">关注人数&nbsp;{{problem.follow}}</span><br/>

                <!-- <p  v-if="!problem.content" style="clear:both;">&nbsp;</p> -->
                 <span class="browse" >发布时间于{{problem.createTime|timeFormater}}</span><br/><br/>
                 <!-- <p class="browse" >更新于:
                     <span v-if="update" >{{problem.updateTime|timeFormater}}</span>
                     <span v-if="!update">未进行更新</span></p> -->
                    <p v-if="!problem.content"  style="clear:both;">&nbsp;</p>
            </el-col>
        </el-row>
    </div>
         <el-row v-if="isWrite">
          <el-col :offset="4" :span="10" class='showdetail'>  
            <p style="color:rgb(64,158,255);font-weight:bold;font-size:20px">图文回答</p>
            <router-view></router-view>
          </el-col>

        </el-row>   
         <el-row v-show="!isWrite">
          <el-col :offset="4" :span="10" class='showdetail'>  
              <p style="text-align: center;">{{problem.reply==0?'暂无回答':'共'+problem.reply+'个回答'}}</p>
              <div style="padding:10px;" v-if="problem.reply">
                  <el-avatar shape="square" :size="50">
                        <img :src="reply.userAvatar"/>
                 </el-avatar>
                 <span class="replyName">{{reply.userName}}</span>
                 <span class="follow2" @click="followUser">{{reply.pay?'已关注':'+关注'}}</span>
                <p style="margin-bottom:20px;" v-html="reply.content" ></p>
                <p style="color:gray">发布于{{reply.createTime | timeFormater}}</p>
                    <el-button type="primary" @click="changePraise(reply)">{{reply.isPraise?'已赞同':'赞同'}}{{reply.thumbUp}}</el-button>
                    <el-button type="primary" plain @click="changeCollect">{{reply.isCollect?'已收藏':'收藏'}}{{reply.collect==0?'':reply.collect}}</el-button>
                    <p class="comment" @click="changeComStatus"> <i class="el-icon-chat-dot-round"></i><span >{{isShowComment?'收起评论':'查看评论'}}</span></p>
                    <el-pagination
                        @current-change="pageChange"
                        background
                        layout=" total,prev, pager, next,jumper"
                        :page-size="1"
                        :current-page.sync="current"
                        :total="problem.reply">
                    </el-pagination>
              </div>

             
                
              <div v-if="isShowComment">
                  <hr class="line"/>
                   <Comment  :replyId="reply.id"/>
              </div>
              <div v-if="isShowCollect">
                  <Favorites :replyId="reply.id"/>
              </div>
          </el-col>
        </el-row>   
       

    </div>
</template>

<script>
import {problemAPI,cancelproblemAPI,followProblem,getReplyAPI,praiseReplyAPI,cancleFollowUserAPI,followUserAPI} from '../utils/apiList'
import Comment from '../components/comment.vue'
import Favorites from './favorites.vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    name:'Problemdetail',
    components:{Comment, Favorites},
    data(){
        return{
            isWrite:false,
            problemId:'',
            isCollect:false,
            problem:{},//问题详情
            reply:{},
            update:false,
            current:1,
            isShowComment:false,
            isShowCollect:false,
        }
        
    },
    mounted() {
        this.problemId=this.$route.query.id
        this.getProblem();
        this.getReply();
        this.$bus.$on('closefav',data=>{
            this.isShowCollect=data
            this.getReply();
        })
        this.$bus.$on('comment',data=>{
          console.log("problemdetail:",this);
            this.isShowComment=false;
            this.isWrite = false;//关闭编辑器
            if(data != 0){

                this.getProblem();//刷新问题详情
                this.current = 1; //页面回归最新
                this.getReply();//重来回答
            }
                
        })
    
       
    },
    methods: {
        //获取问题的详情信息
        getProblem(){
           
            problemAPI(this.problemId).then(res=>
         {
            if(!res)
                return 
            this.problem = res;
            if(this.problem.follow < 0)//关注问题的人数不能为负数
                    this.problem.follow = 0;
            
        }).catch(err=>{
            console.log(err)
        })
        },
        //获得问题的回答详情信息
        getReply(){
            getReplyAPI({
                problemId:this.problemId,
                current:this.current
            }).then(res=>{
                if(!res)
                    return
                this.reply=res;
            }).catch(err=>{
                console.log(err)
            })
        },
        //关注/取关问题
        follow(){
            if(this.problem.pay){//取消关注
                cancelproblemAPI(this.problemId)
            .then(res=>{
                // this.getProblem()//刷新问题的详情信息
                this.problem.pay = false;
                if(this.problem.follow <= 0)
                    this.problem.follow = 0;
                else
                    this.problem.follow --;
                console.log("res",res);
            }).catch(err=>{
                console.log(err)
            })
            }else{
                //关注问题
                followProblem(this.problemId)
                .then(res=>{
                    // this.getProblem()
                    this.problem.pay = true;
                     this.problem.follow ++;
                }).catch(err=>{
                    console.log(err)
                })
            }  
        },
        //关注/取关用户
        followUser(){
            if(this.reply.pay){//取关
                cancleFollowUserAPI(this.reply.userId).then((result) => {
                    this.reply.pay = false;
                }).catch((err) => {
                    
                });
            }//关注用户
            else{
                followUserAPI(this.reply.userId).then((result) => {
                    this.$message({
                        message:'关注成功',
                        type:'success'
                    })
                    this.reply.pay = true;
                }).catch((err) => {
                    
                });
            }
        },

        //写回答
        write(){
            this.isWrite=!this.isWrite
            this.$router.push({
                name:'replyProblem',
                query:{
                    problemId:this.problemId
                }
            })
        },
        changeComStatus(){
            this.isShowComment=!this.isShowComment
        },
        //收藏回答
        changeCollect(){
            this.isShowCollect=!this.isShowCollect
        },
        //赞同问题
        changePraise(reply){
            praiseReplyAPI(reply.id).then(res=>{
                if(res){
                    this.getReply();
                    reply.thumbUp ++;
                }
            }).catch(err=>{
                console.log(err)
            })

        },
        //切换页面
        pageChange(){
            this.isShowComment = false;
             this.getReply();
        }

    },


}
</script>

<style scoped>
.whole{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.main{
    background-color: #fff;
    width:100%;
    height:170px;
    padding: 20px;
    
}

.browse{
    float: right;
    font-size: 16px;
    color: gray;
    
   
}

.browse::after{
    visibility: hidden; 
    display: inline-block; 
    content: " "; 
    clear: both; 
    height: 0; 
}
.follow{
    margin-left: 15px;
    color:gray;
    font-size: 16px;
}
.follow2{
    color:blue;
    margin-left: 15px;
}
.follow2:hover{
    cursor: pointer;
}

.showdetail{
    box-sizing: border-box;
    width:65%;
    margin-top:20px;
    margin-bottom: 0px;
    background-color: white;
    line-height: 50px;
    border-radius: 5px;
    border:1px solid gainsboro;
    padding: 5px; 
    position: relative;
    clear: both;
    
}
.replyName{
     font-size:16px;
     font-weight:bold;
     margin-left: 10px;
     color:rgba(0, 0, 0, 0.695);
    
}

.comment{
    color:gray;
    margin-left: 10px;
    display: inline-block;
    
}
.comment:hover{
    cursor: pointer;
}
.line{
    margin:0px;
    margin-top :5px;
    margin-bottom: 5px;
    height:1px;
    border: none;
    border-top:1px solid #ddd;
    clear:both;
    
}
</style>