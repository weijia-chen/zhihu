<template>
    <div>
        <div v-if="replies. length<=0">
            暂无回答
        </div>
        <ol>
            <li v-for="reply in replies" :key="reply.id" @click="details(reply.problemId)" class="list">
                <div class="problem" >问题：{{reply.title}}</div>
                <div class="additional">
                    <!-- <span>回答：</span> -->
                    <div class="pro" v-html="reply.content"></div>
                    
                </div>
                    <el-popover
                        placement="top"
                        width="160"
                        trigger="hover"
                       style="display:block"
                        >
                        <p>确定移除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button type="primary" size="mini" @click="delCollect(reply.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" size="small" style="float:right;" @click.stop="back">移除</el-button>
                        </el-popover><br/>
                <el-divider style="clear:both;"></el-divider>
            </li>
        </ol>
    </div>
</template>

<script>
import {showFavsProAPI,cancelCollectAPI} from '../utils/apiList'
import {getMyReplyAPI,delMyReplyAPI} from '../utils/apiList'
export default {
    name:'FavsPro',
    data() {
        return {
            fid:'',
            replies:[]
        }
    },
    mounted() {
        this.fid=this.$route.query.id //收藏夹id
        this.redo();
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
        delCollect(id){
            cancelCollectAPI({replyId:id,fid:this.fid}).then(res=>{
                console.log('移除')
                this.redo();
            }).catch(err=>{})
        },
      back(){
          return;
      },
    //   重刷
    redo(){
        showFavsProAPI(this.fid).then(res=>{
            console.log(res)
            this.replies = res;
        }).catch(err=>{})
    }

     }
    

}
</script>

<style>
.list{
    margin-left: 20px;
    line-height: 40px;
}
.problem{
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    cursor: pointer;

}
.problem:hover{
    color:orange
}
.additional{
    font-size: 16px;
    letter-spacing:1px;
    
}
.pro{
    margin-top:8px;
    color:skyblue;
}
</style>