<template>
    <div>
        <div v-if="problems.length<=0">
            你还没有发布问题哦
        </div>
        <ul class="list">
            <li v-for="problem in problems" :key="problem.id" >
                 <div class="problem" @click="details(problem)">{{problem.title}}
                 </div>
                    <div class="additional">
                    <span class="pro">创建时间：{{problem.createTime | timeFormater}}</span>
                    <span style="color:red" v-if="problem.condition==2">违规：{{problem.cause}}</span>
                    <el-popover
                        placement="top"
                        width="160"
                       trigger="hover"
                        >
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <!-- <el-button size="mini" type="text" @click="visible=false">取消</el-button> -->
                            <el-button type="primary" size="mini" @click="deletePro(problem.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" style="float:right" size="small">删除</el-button>
                    </el-popover> 
                <el-divider ></el-divider>
            </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import {getMyPrombleAPI,deleteMyPrombleAPI} from '../utils/apiList'
export default {
    name: 'MyProblem',

    data() {
        return {
            problems:[], 
            // currentPage:1,//当前页码
            // total:0, 
            // pagesize:8
              
        };
    },
    computed:{
        // pageProblem(){
        //     if(this.total>this.currentPage*this.pagesize){
        //         return this.problems.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        //     }else{
        //         return this.problems.slice((this.currentPage-1)*this.pagesize)
        //     }
        // }
    },
    mounted() {
        getMyPrombleAPI().then((result) => {
            if(result){
                this.problems = result;
                // this.total=this.problems.length;
                // this.problems=this.pageProblem;
            }
        }).catch((err) => {
            
        }); 
        
    },

    methods: {
        //删除问题
        deletePro(id){

                deleteMyPrombleAPI(id).then(res=>{
                     getMyPrombleAPI().then((result) => {
                        if(result){
                            console.log('this',this);
                            this.problems = result;
                            // this.total=this.problems.length;
                            // this.problems=this.pageProblem;
                        }
        }).catch((err) => {
            
        }); 
                }).catch(err=>{})
        },

        details(problem){ 
            if(problem.condition == 2){
                Message.error({message:"该问题违规，无法查看"});
                return;
            }
             this.$router.push({
                    name:'problemdetail',
                    query:{
                        'id':problem.id
                    }
                }
             )          
        },
          
    },
};
</script>

<style scoped>
.problem{
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    cursor: pointer;
}
.problem:hover{
    color:rgba(255, 166, 0, 0.521);
}
.additional{
    font-size: 14px;
    margin-top: 30px;
}
.pro{
    margin-right: 28px;
    color:gray;
    
}
.list{
    list-style: none;
    padding:0px;
}
</style>