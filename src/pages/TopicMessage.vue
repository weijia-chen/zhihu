<template>
  <div>
       <span v-if="isNone" style="text-align:center;height:100px;">暂无新回答发布</span>
       <div v-if="messages">
        <div  class="dynamic" v-for="message in messages" :key="message.id">
             <span  class="name">{{message.fromUserName}}</span>
             <span>在话题</span>
             
             <a  href="#" @click="problemList(message.topicId)" class="name">{{message.topicName}}</a>
             <span>提出了一个新问题: </span>

             <router-link :to="{
                    name:'problemdetail',
                    query:{
                        id:message.problemId
                    }
                }" 
                 class="problem">{{message.problemTitle}}</router-link>
            <span class="time">{{message.createTime | timeFormater}}</span>
            <el-divider></el-divider>
        </div>
         <el-pagination
                 @current-change="pageChange"
                background
                layout="prev, pager, next"
                :page-size="8"
                :current-page.sync="currentPage"
                :total="total">
        </el-pagination>  
       </div>  
    </div>
</template>

<script>
import {getFollowTopicMessageSPI} from '../utils/apiList'
export default {
    name:'TopicMessage',
     data() {
        return {
            messages:[],
            currentPage:1,//当前页码
            total:0, 
            isNone:false
        };
     },
     mounted() {
         this.getList(this.currentPage);
         
         
     },
     methods: {
         //获取关注的话题的消息列表
         getList(page){
             getFollowTopicMessageSPI(page).then(res=>{
                 this.messages=res.data;
                 this.total = res.total;
                 if(this.messages.length==0){
                        this.isNone=true
                    }
             }).catch(err=>{
                 console.log(err)
             })

         },
         //切换页面
         pageChange(current){
             this.getList(current);
         },

         //获取话题的详情
         problemList(id){
            this.$router.push({
                name:"problemlist",
                query:{
                    id
                }
            })
        },

     },


}
</script>

<style scoped>
.dynamic{
       margin-top: 10px;
    font-size: 18px;
}
.dynamic:after { 
    visibility: hidden; 
    display: block; 
    content: " "; 
    clear: both; 
    height: 0; 
    margin-bottom: 15px;
}

.dynamic a{
     text-decoration: none;
}
.name{
    color:#225599;
    margin-right: 13px;
    margin-left: 12px;
}

.problem{
    color:#225599;
    margin-left: 20px;
    line-height: 40px;
}
.time{
    font-size: 17px;
    float:right;
    margin-top: 12px;
}
</style>