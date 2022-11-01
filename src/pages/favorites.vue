<template>
    <div class="collect-box">
        <div class="mask">
            <p class="title">添加收藏夹</p>
            
            <el-button icon="el-icon-close" circle class="close" @click="destroy"></el-button>
            <!-- <p class="add">新建收藏夹</p> -->
            <div class="contain">
            <ul class="ul">
                <li v-for="fav in favoritesList" :key="fav.id" >
                 {{fav.name}}
                    <el-button round class="btn" size="small" @click="toColl(fav.flag,fav.id)">{{fav.flag?'已收藏':'收藏'}}</el-button>
                </li>
               
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
import {getFavoritesAPI,toCollectAPI,cancelCollectAPI} from '../utils/apiList'
export default {
    name:'Favorites',
    props:['replyId'],
    data(){
        return{
            favoritesList:{},
            isColse:false
        }
    },
    mounted() {
        this.getList();
        
    },
    methods: {
        getList(){
            getFavoritesAPI(this.replyId)
            .then(res=>{
                this.favoritesList=res
            }).catch(err=>{
                console.log(err)
            })
        },
            //关闭当前窗口
        destroy(){
            this.$bus.$emit('closefav',this.isColse)
        },
        //改变收藏状态
        toColl(flag,fid){
            if(flag){//若为收藏状态，点击取消收藏
                cancelCollectAPI({
                    replyId:this.replyId,
                    fid:fid
                }).then(res=>{
                    this.getList();
                }).catch(err=>{
                    console.log(err)
                })
            }else{//反之添加收藏
                toCollectAPI({
                    replyId:this.replyId,
                    fid:fid
                }).then(res=>{
                    this.getList();
                }).catch(err=>{
                    console.log(err)
                })
            }

        }
        
    },

}
</script>

<style scoped>
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
        .add{
            height: 36px;
            line-height: 36px;
            margin:0px;
        }
        .add:hover{
            background-color: #ddd;
            cursor: pointer;
        }
        .contain{
            overflow-y: auto;
            max-height:80%;
        }
        .ul{
            
            padding:0px;
            width: 100%;   
        }
        li{
            list-style: none;
            width: 100%;
            height: 36px;
            line-height: 36px;
            padding: 0px;
            
            padding: 0px;
	        margin: 0px;
        }
        li label{
            display: block;
            float: left;
            cursor: pointer;
        }
        .btn{
            float: right;
            
        }
      
        li:hover{
        background-color: #ddd;
        cursor: pointer;
        }
</style>