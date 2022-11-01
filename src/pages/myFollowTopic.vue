<template>
 <div>
    <div v-if="topics.length<=0">
        未关注话题
     </div>
  <div v-if="topics">
    <div  v-for="topic in topics" :key="topic.topicId" style="clear:both;margin-bottom:30px;">
         <p @click="problemList(topic.topicId)" class="topic"> {{topic.topicName}} </p>
            <el-button type="info" plain class="btn" size="small" @click="cancle(topic.topicId)">已关注</el-button>
    </div>
    </div>
    </div>
</template>

<script>
import {GetFollowTopicAPI,cancelTopicAPI} from '../utils/apiList'
export default {
    name:'MyFollowTopic',
    data() {
        return {
            topics:[],
            isNone:false
        };
    },

    mounted() {
       this.getlist();
        
    },

    methods: {
        getlist(){
            GetFollowTopicAPI().then(res=>{
                
                if(res){
                    this.topics = res;
                    if(res.length==0){
                        this.isNone=true
                    }
                }
                }).catch(err=>{
                    console.log(err)
                })
        },
        problemList(id){
            this.$router.push({
                name:"problemlist",
                query:{
                    id
                }
            })
        },
        cancle(id){
            cancelTopicAPI(id).then(res=>{
                this.getlist();
            }).catch(err=>{
                console.log
            })
            
        }
    }

}
</script>

<style scoped>
.btn{
    float: right;
    margin-right: 10px;
   
}
.topic{
    font-size: 20px;
    color:black;
    font-weight: bold;
    display: inline-block;
    margin-left: 10px;
}
.topic:hover{
    color:orange;
    cursor: pointer;
}
</style>