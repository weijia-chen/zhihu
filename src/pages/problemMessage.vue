<template>
    <div>
        <span v-if="messages.length<=0" style="text-align:center;height:100px;">订阅的问题暂无新回答</span>
            <div class="dynamic" v-for="message in messages" :key="message.id">
                <span href="#" class="name">{{message.fromUserName}}
                    回答了问题
                    </span>
                <br/>
                <router-link :to="{
                    name:'problemdetail',
                    query:{
                        id:message.problemId
                    }
                }" 
                 class="problem">{{message.problemTitle}}</router-link>
               
                <span class="time">{{message.createTime | timeFormater}}</span>
                <hr class="line"/>
            </div>     
    </div> 
</template>

<script>
import {getFollowProMessageSPI} from '../utils/apiList'
export default {
    name:'ProblemMessage',
    data() {
        return {
            messages:[],
            currentPage:1,//当前页码
            total:0, 
        };
     },
     mounted() {
         this.getlist(this.currentPage);
         
     },
    methods: {
         //获取关注的问题的消息列表
        getlist(page){
            getFollowProMessageSPI(page).then(res=>{
                console.log(res)
                this.messages=res.data;
                 this.total = res.total;
             }).catch(err=>{
                 console.log(err)
             })
        },

         //切换页面
         pageChange(current){
             this.getlist(current);
         },
    },

}
</script>

<style>
    .dynamic{
    padding: 5px;
    
    font-size: 18px;

}
.dynamic a{
     text-decoration: none;
}

.dynamic a:hover{
     color:skyblue;
}
.name{
    color:gray;
    font-size: 14px;
}
.dynamic:after { 
          visibility: hidden; 
          display: block; 
          content: " "; 
          clear: both; 
          height: 0; 
         }
.problem{
    color:black;
    line-height: 40px;
    font-size:16px;
    font-weight: bold;
}
.time{
    font-size: 14px;
    float:right;
    margin-top: 12px;
    margin-bottom: 5px;
    color:gray;
}
.line{
    margin:0px;
    margin-top :5px;
    height:1px;
    border: none;
    border-top:1px solid #ddd;
    clear:both;
    
}
</style>