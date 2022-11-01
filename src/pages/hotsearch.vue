<template>
   <div>
        
                <ol class="order">
                    <li v-for="problem in problems" :key="problem.id" class="hot" >
                      <router-link :to="{
                        name:'problemdetail',
                        query:{
                          id:problem.id
                        }
                      }"
                        class="title">
                        {{problem.title}}</router-link>
                        <span class="visit">{{problem.visits}}人正在看</span>
                    </li>
                </ol>
         
    </div>
</template>

<script>
import {GetHotMessAPI} from '../utils/apiList'
export default {
    name:'Hotsearch',
    data(){
      return{
        problems:[],
      }
    },
    mounted() {
      GetHotMessAPI().then(res=>{
        this.problems=res
      }).catch(err=>{
        console.log(err)
      })
    },

}
</script>

<style  scoped>
.hot{
    margin: 0px;
    height: 36px;
    clear: both;
   
}
.title{
    cursor: pointer;
    font-size: 20px;
    margin-right: 40px;
    color: black;
    font-weight: bold;
    text-decoration: none;
}
.title:hover{
    color: skyblue;
}
.visit{
    color:#225599;
    float:right;
    font-size: 16px;
    margin-right: 10px;
    font-weight: normal;
}
.order{
  font-size: 20px;
  font-weight: bold;
 color:orange;
 margin-right: 10px;
 
}

</style>