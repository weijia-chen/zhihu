<template>
    <div class="mask">
            
            <input type="text" 
                v-show="isAdd" 
                v-model="name"  
                placeholder="输入新建文件夹的名称"
                style="margin-right:15px;"
            ref="inputTitle"/>
            <el-button type="success" icon="el-icon-check" circle v-show="isAdd" size="mini" @click="toAdd()"></el-button>
            <p class="add" v-show="!isAdd" @click="add()">+新建收藏夹</p>
            <p v-if="isShow" style="text-align:center">未创建收藏夹</p>
            <div v-if="!isShow">
            <ul class="ul">
                <li v-for="fav in favoritesList" :key="fav.id"  @click="showPro(fav.id)">
                <label>{{fav.name}}</label>
                <el-button round class="btn" size="small" @click.stop="deleteFav(fav.id)">删除收藏夹</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import{getFavsAPI,detFavsAPI,creFavsAPI} from '../utils/apiList'
export default {
    name:'Mycollect',
    data() {
        return {
             favoritesList:{},
             isShow:false,
             isAdd:false,
             name:''

        }
    },
    mounted() {
        this.getlist();
    },
    methods: {
        getlist(){
            getFavsAPI().then(res=>{
                if(res.length!=0){
                    this.favoritesList=res
                    this.isShow = false
                }else{
                    this.isShow=true
                }
            }).catch(err=>{})
        },
        deleteFav(id){
            detFavsAPI(id).then(res=>{
                this.getlist();
            }).catch(err=>{})

        },
        showPro(id){
            console.log("fid",id);
            this.$router.push({
                name:'favspro',
                query:{
                    id
                }
            })

        },
        add(){
            this.isAdd=!this.isAdd
        },
        toAdd(){
            if(this.name.trim()==""){
                this.$message.error({
                    message:'收藏夹名称不能为空'
                })
                this.name='';
                return;
            }
            creFavsAPI(this.name).then(res=>{
                this.add();
                this.getlist();
            }).catch(err=>{console.log(err)})

        }
        
    },


}
</script>

<style scoped>
    .mask{
            background-color: #fff;
            padding:10px;
            border-radius: 8px;
            box-shadow: 0px 1px 4px rgba(0,0,0,0.3);

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
     
        .ul{
            
            padding:0px;
            width: 100%;   
        }
        li{
            list-style: none;
            width: 100%;
            height: 40px;
            line-height: 40px;
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