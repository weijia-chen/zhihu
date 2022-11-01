<template>
  <div>
    <el-row>
        <el-col :offset="6" :span="11">
        <span v-if="messages.length<=0" style="text-align:center;height:100px;">暂无新消息</span>
        <div class="dynamic" v-for="(message) in messages" :key="message.id">
             <div v-if="message.kind==1" >
                 <span class="name">{{message.fromUserName}}</span>
                 <span class="tip">点赞了你的回答</span>
                  <router-link :to="{
                    name:'problemdetail',
                    query:{
                        id:message.problemId
                    }
                }" 
                 class="problem">{{message.problemTitle}}</router-link>
                <span>下的回答</span>
                <br/>
                <p class="time">{{message.createTime | timeFormater}}</p>
             </div>
            <div v-else-if="message.kind==2" >
                <span class="name">{{message.fromUserName}}</span>
                <span class="tip">评论了你的回答</span>
                <router-link :to="{
                        name:'problemdetail',
                        query:{
                            id:message.problemId
                        }
                    }" 
                 class="problem">{{message.problemTitle}}</router-link>
                <br/>
                <p class="time">{{message.createTime | timeFormater}}</p>   
            </div>
            <div v-else-if="message.kind==3" >
                <a href="#" class="name">{{message.fromUserName}}</a> 
                <span class="tip">关注了你</span>
                <br/>
                <p class="time">{{message.createTime | timeFormater}}</p>   
            </div>   
            <div v-else-if="message.kind==4" >
                <span href="#" class="name">{{message.fromUserName}}</span>
                <span class="tip">回复了你的问题</span>
                  <router-link :to="{
                    name:'problemdetail',
                    query:{
                        id:message.problemId
                    }
                }" 
                 class="problem">{{message.problemTitle}}</router-link>
                <br/>
                <p class="time">{{message.createTime | timeFormater}}</p>   
            </div> 
            <div v-else >
                <span  class="name">{{message.fromUserName}}</span>
                <span class="tip">关注了你的问题</span>
                <router-link :to="{
                    name:'problemdetail',
                    query:{
                        id:message.problemId
                    }
                }" 
                 class="problem">{{message.problemTitle}}</router-link>
                <br/>
                <p class="time">{{message.createTime | timeFormater}}</p>   
            </div>             
              <hr class="line"/>
        </div> 
            <el-pagination
                    @current-change="pageChange"
                    layout="prev, pager, next"
                    :page-size="8"
                    :current-page.sync="current"
                    :total="total">
            </el-pagination> 
            </el-col>
        </el-row>      
  </div>
</template>

<script>
import {ChangeMessAPI} from '../utils/apiList'
export default {
    name:'Messages',
    data(){
        return{
            messages:[],
            current:1,//当前页码
            total:0,
        }
    },
    methods: {
        pageChange(){
                ChangeMessAPI(this.current).then(res=>{
                    this.messages=res.data;
                    this.total = res.total;
                }).catch(err=>{
                    console.log(err)
                })  
        },
    },
    mounted() {
        console.log("消息组件.....");
        this.pageChange();
    },
    activated() {
		console.log('News组件被激活了111')
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
          height: 0;margin-bottom: 15px; }
.dynamic a{
     text-decoration: none;
}
.name{
    
    margin-right: 10px;
}
.problem{
    color:#225599;
    line-height: 50px;
    margin-left: 50px;
}
.problem:hover{
    color:orange;
    cursor: pointer;
}
.time{
    font-size: 14px;
    float:right;
    margin-top: 12px;
    color: gray;
}
.tip{
    font-size: 16px;
    color: gray;
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