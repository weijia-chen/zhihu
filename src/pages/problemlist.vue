<template>
<el-row>
    <el-col :offset="4" :span="10"  class='showdetail'>
    <div>
        <div v-for="problem in problems" :key="problem.id" class="main">
            <router-link :to="{
                name:'problemdetail',
                 query:{
                    id:problem.id
                    }
                }"
                class="problem">
                {{problem.title}}</router-link>
                <br/>
            
                <span class="pro">更新时间：{{problem.updateTime | timeFormater}}</span>
                <span class="pro">已经有{{problem.reply}}人回答</span>
                <hr class="line"/>
        
        </div>
        <el-pagination
                @current-change="pageChange"
                background
                layout="prev, pager, next"
                :page-size="3"
                :current-page.sync="currentPage"
                :total="total">
         </el-pagination>
    </div>
    </el-col>
 </el-row>
</template>

<script>
import {getTopicProAPI} from '../utils/apiList'
export default {
    name:'ProblemList',
     data() {
        return {
            problems:[],
            currentPage:1,//当前页码
            total:0, 
            topicId:''
        };
    },
    
    mounted() {
        this.topicId=this.$route.query.id
        this.getlist();
    },
    methods: {
        getlist(){
            getTopicProAPI({
                topicId:this.topicId,
                currentPage:this.currentPage
            }).then(res=>{
                this.problems=res.data;
                this.total = res.total;
            }).catch(err=>{
                console.log(err)
            })
        },
         pageChange(current){
            this.getlist();
        },
    }



}
</script>

<style scoped>
.showdetail{
    box-sizing: border-box;
    width:65%;
    margin-top:10px;
    margin-bottom: 0px;
    background-color: white;
    line-height: 50px;
    padding-left:45px;
    border-radius: 5px;
    border:1px solid gainsboro; 
}
.problem{
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
    cursor: pointer;
    letter-spacing:2px;
    margin-bottom: 10px;
    text-decoration: none;
}
.problem:hover{
    color:orange
}
.pro{
    
    margin-right: 28px;
    font-size:14px;
    color:gray;
    
}
.line{
    margin:0px;
    margin-top :10px;
    height:1px;
    border: none;
    border-top:1px solid #ddd;
    clear:both;
}
</style>