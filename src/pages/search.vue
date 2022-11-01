<template>
 <el-row>
    <el-col :offset="6" :span="11" class='showdetail'>
    <div>
        <div v-for="problem in problems" :key="problem.id" class="main">
            <div class="problem" @click="details(problem.id)">{{problem.title}}</div>
            <div class="additional">
                <span class="pro">发布时间：{{problem.updateTime | timeFormater}}</span>
                <span class="pro">发布用户：{{problem.userName}}</span>
                <el-divider></el-divider>
            </div>
        </div>
    </div>
    </el-col>
 </el-row>
</template>

<script>
import {searchAPI} from '../utils/apiList'
export default {
    name: 'Search',

    data() {
        return {
            problems:[],
        };
    },
    props:['query'],
    mounted() {
       
        console.log("query",this.query);
        this.redo()
    },
    watch:{
        query(val){
            console.log("发生变化",this.query,val);
            this.redo();
        }
    },
    methods: {
        details(id){            
            this.$router.push({
                name:'problemdetail',
                query:{
                    id
                }
            })
        },

        redo(){
                searchAPI(this.query).then((result) => {
                    this.problems = result;
                }).catch((err) => {
                    
                });
            }
    },
};
</script>

<style  scoped>
<<<<<<< Updated upstream
.showdetail{
    box-sizing: border-box;
    width:65%;
    margin-top:0px;
    margin-bottom: 0px;
    background-color: white;
    line-height: 50px;
    padding-left:30px;
    padding-right: 30px;
    border-radius: 5px;
    border:1px solid gainsboro; 
}
.problem{
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
    cursor: pointer;
    letter-spacing:2px;
}
.additional{
    font-size: 12px;
    letter-spacing:1px;
}
.pro{
    margin-right: 28px;
    
}
</style>