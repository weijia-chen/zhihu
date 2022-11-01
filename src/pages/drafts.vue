<template>
  <div>
      <p v-if="draft_text.length<=0" style="text-align:center">未存储回答到草稿箱</p>
        <ul class="list" v-show="drafts">
            <li v-for="(draft,index) in draft_text" :key="draft.id" >
                 <div class="problem" @click="details(draft.problemId)">{{draft.title}}
                 </div>
                    <div class="additional">
                    <span class="pro" >{{draft.content}}</span>

                    <el-popover
                        placement="top"
                        width="160"
                       trigger="hover"
                        >
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <!-- <el-button size="mini" type="text" @click="visible=false">取消</el-button> -->
                            <el-button type="primary" size="mini" @click="deleteDrafts(draft.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" style="float:right" size="small">删除</el-button>
                        </el-popover>
                        <el-button slot="reference" style="float:right" size="small" @click="change(index)">修改</el-button>
                        
                    
                <el-divider ></el-divider>
            </div>
            </li>
        </ul>
            <!-- <div v-show="isEdit">
              <router-view></router-view>
           </div> -->
            <el-dialog v-if="isEdit"
            :visible.sync="isEdit"
            width="80%"
            :center="true"
            top="20px"
            :destroy-on-close="true">
            <div class="a">
                <router-view></router-view>
            </div>
         
        </el-dialog>
    </div>
</template>

<script>
import {searchDraftAPI,delMyReplyAPI} from '../utils/apiList'
export default {
    name:'Drafts',
    data() {
      return {
            draft_text:[],
            drafts:[], 
            currentPage:1,//当前页码
            total:0, 
            pagesize:8,
            isEdit:false
      }
    },
    mounted() {
        //修改后刷新页面
        this.$bus.$on("load",data=>{
            this.getDrafts();
            //关闭弹窗
            this.isEdit = false;
        })
        this.getDrafts();
        
    },
    methods: {
        getDrafts(){
            searchDraftAPI().then(res=>{
                    this.drafts=res;
                    this.total=this.drafts.length;
                    let source = JSON.stringify(res);
                    this.draft_text  = JSON.parse(source);
                    for(let i in  this.draft_text){
                        console.log(i);
                        this.draft_text[i].content = this.draft_text[i].content.replace(/<[^<>]+>/g,""); 
                    }
                    console.log( " this.drafts",this.drafts);
                }).catch(err=>{
                    console.log(err)
                })
        },
      change(index){
        this.isEdit=!this.isEdit
            console.log("index:",index);
            let draft = this.drafts[index]//要修改的草稿回答
            this.$router.push({
                name:'updateDraft',
                query:{
                  draftId:draft.id, //草稿回答的id
                  content:draft.content, //草稿回答的内容：用于回显
                  problemId:0 //无需传递问题id，但与问题详情页面一致，传入0用于编辑器区别
                }
      })
      },
      pageChange(current){
            console.log(current)
            this.problems=this.pageProblem
        },
        deleteDrafts(rid){
            delMyReplyAPI(rid).then((result) => {
                 this.getDrafts();
            }).catch((err) => {
                
            });
        },
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
    font-size: 18px;
    margin-top: 30px;
}
.pro{
    margin-right: 28px;
    color:skyblue;
    
}
.list{
    list-style: none;
    padding:0px;
}
</style>