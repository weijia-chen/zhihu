<template>
    <div>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="input"
                style="width:50%;"
                >
            </el-input>
            <el-button 
            type="primary" 
            style="display: inline-block;margin-left:10px;" 
            @click="issueCom">发布</el-button>
           
         <div  v-for="itme in commentList" :key="itme.id" style="margin-top:10px;">
                <el-avatar shape="square" :size="30" :src="itme.userAvatar"></el-avatar> 
                <span class="name">{{itme.userName}}</span>
                <p>{{itme.content}}:<span class="mood">{{itme.mood == 0?'积极':'消极'}}</span></p>
                <p style="color:gray">{{itme.createTime | timeFormater}}</p>
                <hr class="line"/>
            
        </div>
        <p v-if="!this.commentList.length" style="color:gray;text-align:center">回答未有人评论，快留下你的想法吧</p>
    </div>
  
</template>

<script>
import {commentListAPI,toCommentAPI} from '../utils/apiList'
export default {
    name:"Comment",
    props:['replyId'],
    data() {
        return {
            input:'',
            commentList:[]
        }
    },
    mounted() {
        commentListAPI(this.replyId).then(res=>{
            if(!res.length==0){
                this.commentList = res;
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
         issueCom(){
            if(this.input.trim() == ""){
                this.$message.error({
                    message:'请输入评论内容'
                });
                return;
            }
            //进行评论
              toCommentAPI({
                replyId:this.replyId,//回答id
                content:this.input,//评论内容
              }).then(res=>{
                  console.log('111')
                   if(res){
                    this.input ="";
                    this.commentList.unshift(res);
                   }
              }).catch(err=>{
                  console.log(err)
              })
    }
 }

}
</script>

<style>
.r{
display: inline-block;
}
.line{
    margin:0px;
    margin-top :5px;
    margin-bottom: 5px;
    height:1px;
    border: none;
    border-top:1px solid #ddd;
    clear:both;
}
.name{
    margin-left: 10px;
    font-weight: bold;
}
.mood{
    color: #FFB6C1;
}
</style>