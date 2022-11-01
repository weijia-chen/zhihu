<template>
        <div class="aa">
             <p class="title">修改密码</p>
            <!-- <el-button icon="el-icon-close" circle class="close" @click="destroy"></el-button> -->
            <el-input class="bb" placeholder="请输入旧密码" v-model="old" show-password></el-input>
            <el-input class="bb"  placeholder="请输入新密码" v-model="newone" show-password></el-input>
            <el-input class="bb" placeholder="再次输入新密码" v-model="newtwo" show-password></el-input>
            <el-button  class="bb" type="primary" style="margin-left:38%;" @click="change">确认修改</el-button>
        </div>
</template>

<script>
import {changePswAPI} from '../utils/apiList'
export default {
    name:'Changepsw',
    
    data(){
        return{
            old:'',
            newone:'',
            newtwo:'',
            isColse:false
        }
    },
    
    methods: {
        
            //关闭当前窗口
        // destroy(){
        //     this.$bus.$emit('closeChangePsw',this.isColse)
        // },
        change(){
            if(this.newone.trim()==''||this.newtwo.trim()==''||this.old.trim()==''){
                this.$message({
                    message:'输入的新密码或旧密码均不能为空！'
                });
                return;
            }
            if(this.newone.trim()!=this.newtwo.trim()){
                this.$message({
                    message:'两次输入的新密码不一致'
                });
                this.newone='';
                this.newtwo='';
                return;
            }
            changePswAPI({
                oldPass:this.old,
                newPass:this.newone
            }).then(res=>{
                //  this.$bus.$emit('closeChangePsw',this.isColse)//关闭窗口
                this.$bus.$emit("pass",false);
            })


        }
       
    },

}
</script>

<style scoped>
.bb{
  margin-top:16px ;
}
 .collect-box{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            display:flex;
            align-items: center;
            justify-content: center;
        }
        .mask{
            background-color: #fff;
            padding:10px;
            border-radius: 8px;
            box-shadow: 0px 1px 4px rgba(0,0,0,0.3);
            width:25%;
            height:300px;

        }
        .title{
            display: inline-block;
            margin:0 auto;
            margin-left: 35%;
            margin-top:5px;
            font-weight: bold;
            font-size: 20px;
            
           
        }
        .close{
            float:right;
            
        }
        
</style>