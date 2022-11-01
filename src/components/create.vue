<template>
  <div>
      <el-row>
          <el-col :offset="4" :span="10" class="page">    
            <h1 style="font-size:20px;"><i class="el-icon-edit" style="color:rgb(64,158,255)"></i>创作中心</h1>
            <div class="card">
                <el-tabs v-model="activeName" >
                    <el-tab-pane  name="writequestion">
                        <span slot="label"><i class="el-icon-edit-outline"></i>写问题</span></el-tab-pane>
                    <el-tab-pane  name="drafts">
                        <span slot="label"><i class="el-icon-folder"></i> 草稿箱</span></el-tab-pane>
                </el-tabs>
                <router-view></router-view>    
            </div>
          </el-col>
      </el-row>  

  </div>
</template>

<script>

export default {
    name:'Create',
    data(){
        return {
        activeName: 'writequestion'
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
            name:'writequestion'
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