<template>

    <div>
        <div>
            <span v-if="isNone" style="text-align:center;height:100px;">关注的用户很安静</span>
             <div v-if="messages">
            <div class="dynamic" v-for="message in messages" :key="message.id">
                <span href="#" class="name">{{message.fromUserName}}
                    {{message.kind==1?'回答了问题':' 提出了新问题'}} 
                    
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
            <el-pagination
                @current-change="pageChange"
                background
                layout=" total,prev, pager, next"
                :page-size="pagesize"
                :current-page.sync="currentPage"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

import {followMessageAPI,} from '../utils/apiList'
export default {
    name: 'Follow',

    data() {
        return {
            messages:[],
            currentPage:1,//当前页码
            total:0, 
            pagesize:8,
            isNone:false
        };
    },


    mounted(){
        
       this.getList(this.currentPage)
    },
    
    methods: {
        getList(page){
             followMessageAPI(page)
                    .then((result) =>{
                        this.messages=result.data;
                        this.total=result.total;
                        if(this.messages.length==0){
                        this.isNone=true
                    }
                     
                    }).catch((err =>{
                    }))
        },
        //切换页面
        pageChange(current){
            this.getList(current)
        },
    },
   
};
</script>

<style  scoped>
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