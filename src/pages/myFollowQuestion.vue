<template>
    <div>
        <div v-if="problems.length<=0">
            你还没有订阅问题哦
        </div>
        <ul class="list">
            
            <li v-for="problem in problems" :key="problem.id" >
                 <div class="problem" @click="details(problem.id)">{{problem.title}}
                 </div>
                    <div class="additional">
                    <span class="pro">创建时间：{{problem.createTime | timeFormater}}</span>
                    <el-popover
                        placement="top"
                        width="160"
                       trigger="hover"
                        >
                        <p>确定取关吗？</p>
                        <div style="text-align: right; margin: 0">
                            <!-- <el-button size="mini" type="text" @click="visible=false">取消</el-button> -->
                            <el-button type="primary" size="mini" @click="delFollowProblem(problem.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" style="float:right" size="small">取关</el-button>
                        </el-popover> 
                <el-divider ></el-divider>
            </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {searchFollowProblemsAPI,cancelproblemAPI} from '../utils/apiList'
export default {
    name:'myFollowQuestion',
    data() {
        return {
            problems:[],               
        };
    },
    mounted() {
        this.redo()
    },

    methods: {
        //取消关注问题
        delFollowProblem(id){
            cancelproblemAPI(id).then(res=>{
                    this.redo();
                }).catch((err) => {
                    
                }); 
        },

         details(id){  
             this.$router.push({
                    name:'problemdetail',
                    query:{
                        id
                    }
                }
             )          
        },
         //   重刷
        redo(){
            searchFollowProblemsAPI().then((result) => {
                if(result){
                    this.problems = result;
                }
            }).catch((err) => {
                
            }); 
        }
          
    },
}
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