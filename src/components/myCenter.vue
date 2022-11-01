<template>
  <div>
      <el-row>
          <el-col :offset="4" :span="10" class="page">    
            <h1 style="font-size:20px;"><i class="el-icon-edit" style="color:rgb(64,158,255)"></i>我的中心</h1>
            <div class="card">
                <el-tabs v-model="activeName" >
                    <el-tab-pane  name="mycollect">
                        <span slot="label"><i class="el-icon-edit-outline"></i>我的收藏</span></el-tab-pane>
                          <el-tab-pane  name="myquestion">
                        <span slot="label"><i class="el-icon-tickets"></i> 已发布问题</span></el-tab-pane>
                    <el-tab-pane  name="myreply">
                        <span slot="label"><i class="el-icon-folder"></i> 我的回答</span></el-tab-pane>
                        <el-tab-pane  name="myfollowtopic">
                        <span slot="label"><i class="el-icon-folder"></i> 关注的话题</span></el-tab-pane>
                        <el-tab-pane  name="myfollowquestion">
                        <span slot="label"><i class="el-icon-folder"></i> 关注的问题</span></el-tab-pane>
                        <el-tab-pane  name="myfollowuser">
                        <span slot="label"><i class="el-icon-folder"></i> 关注的人</span></el-tab-pane>
                </el-tabs>
                <router-view></router-view>    
            </div>
          </el-col>
      </el-row>  

  </div>
</template>

<script>

export default {
    name:'MyCenter',
    data(){
        return {
        activeName: 'mycollect'
      };
    },
    watch:{
        activeName:function(routename){/*name为切换的路由名称 */
            this.$router.push({
                name:routename
            })
        }
    },
    mounted(){
        this.$router.push({
            name:'mycollect'
            })
    }


}
</script>

<style scoped>
    .page{
        margin-top:10px;     
        width:65%;
        background-color: white;
        border-radius: 5px;
        border:1px solid gainsboro; 
        padding:10px;
        padding-top:20px;

    }
    .card{
        margin-top:20px;
    }
</style>