<template>
    <div>
        <Header />
        <div >

             <router-view></router-view>
        <el-dialog
            :visible.sync="isShow"
            width="20%"
            :center="true"
            top="20px"
            :before-close="handleClose"
            :destroy-on-close="true">
        <Changepsw />
        </el-dialog>
        </div>
       
    </div>
</template>

<script>
import Header from './Header.vue';
import HomeMenu from './homeMenu'
import Changepsw from '../pages/changepsw.vue'
export default {
  components: {HomeMenu,Header,Changepsw},
    name: 'Home',

    data() {
        return {
            isShow:false,
        };
    },
    mounted() {
        this.$router.push({
           name:'home'
        })
         this.$bus.$on("pass",(bl)=>{
            console.log("pass被触发");
           this.isShow = bl;
        })
    },
	beforeDestroy() {
		this.$bus.$off('pass')
	},
    methods: {
        handleClose(done){
           done();
        }
    },
};
</script>

<style  scoped>

</style>