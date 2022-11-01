<template>
    <div>
        <el-row>
            <el-col :offset="4" :span="10" class='showdetail'>
                <div class="topic" 
                v-for="topic in topics" 
                :Key="topic.id"
                @click="problemList(topic.id)"
                >
                    <p>
                        <span class="title">话题：</span>{{topic.topicName}}
                        <span class="pay"
                        @click.stop="pay(topic)"
                        
                        ><i class="el-icon-plus" v-show="!topic.pay"></i>{{topic.pay?'已关注':'关注'}}</span>
                    </p>  
                    <p v-if="topic.introduce"><span class="title">介绍：</span>{{topic.introduce}}</p>
                   
                    <el-divider></el-divider>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getTopicAPI,followTopicAPI,cancelTopicAPI} from '../utils/apiList'

export default {
    name: 'Topic',

    data() {
        return {
            topics:[]
        };
    },

    mounted() {

        getTopicAPI().then(res=>{
            this.topics = res;
        }).catch(err=>{
            console.log(err)
        })
        
    },

    methods: {
        problemList(id){
            this.$router.push({
                name:"problemlist",
                query:{
                    id
                }
            })
        },
        pay(topic){
            if(topic.pay){
               cancelTopicAPI(topic.id).then(res=>{
                   this.$set(topic,'pay',false);
               }).catch(err=>{console.log(err)})
            }else{
                followTopicAPI(topic.id).then(res=>{
                     this.$message({
                        message: '关注成功！',
                        type: 'success',
                        showClose:true
                    });
                    this.$set(topic,'pay',true);
                }).catch(err=>{console.log(err)})
            }
                

           
        },
    },
};
</script>

<style scoped>
.showdetail{
    box-sizing: border-box;
    width:65%;
    margin-top:10px;
    margin-bottom: 0px;
    background-color: white;
    line-height: 50px;
    padding:30px;
    border-radius: 5px;
    border:1px solid gainsboro; 
}
.title{
    color:#225599;
    font-size:18px;
}
.topic{
    cursor: pointer;
}
.pay{
    margin-left: 40px;
    color: #225599;
}
</style>