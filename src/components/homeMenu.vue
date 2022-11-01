<template>
  <div >
      <el-row>
          <el-col :offset="4" :span="10" class='title'>    
            <router-link to="/zhihu/home/follow" active-class="active" >关注的人</router-link>
            <router-link to="/zhihu/home/problemMessage" active-class="active" >关注的问题</router-link>
            <router-link to="/zhihu/home/topicMessage" active-class="active" >关注的话题</router-link>
            <router-link to="/zhihu/home/hotsearch" active-class="active">热搜</router-link>
          </el-col>
      </el-row>   
       <el-row>
          <el-col :offset="4" :span="10" class='showdetail'>  
              <router-view></router-view>
          </el-col>
        </el-row>    

      
  </div>
</template>

<script>
export default {
    name:'HomeMenu',
    mounted() {
        this.$router.push({
            name:'hotsearch'
        })
    },
}
</script>

<style scoped>
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
.title{
    height: 60px;
    margin-top: 10px;
}

.title{
    box-sizing: border-box;
    width:65%;
    
    margin-bottom: 0px;
    background-color: white;
    line-height: 50px;
    padding-left:45px;
    border-radius: 5px;
    border:1px solid gainsboro; 
}
a{

    text-decoration: none;
    font-size: 16px;
    font-weight: normal;
    color:black;
    
    margin-right:40px;
}
a:hover{
    color:orange;
}
.active{
    color:rgba(0, 110, 255, 0.904);
}

</style>