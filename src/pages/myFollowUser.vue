<template>
    <div>
    <div v-if="users.length<=0">
            未关注其他用户
    </div>
    <div class="follow">
        <ol v-if="users">
            <li v-for="user in users" :key="user.targetId" style="clear:both">
                <span class="name">{{user.nickName}}</span>
                 <el-button type="info" 
                 plain size="small" 
                 @click="cancle(user.targetId)"
                 style="float:right"
                 >取消关注</el-button>
            </li>
        </ol>
    </div>
</div>
</template>

<script>
import {getMyFollowUserAPI,cancleFollowUserAPI} from '../utils/apiList'
export default {
    name:'MyFollowUser',
    data() {
        return {
            users:[]
        }
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser(){
            getMyFollowUserAPI().then(res=>{
            this.users=res;
        }).catch(err=>{})
        },
        cancle(id){
            cancleFollowUserAPI(id).then(res=>{
                console.log('取关成功')
                this.getUser();
            }).catch(err=>{})
        }
    }

}
</script>

<style scoped>
.follow{
    padding-left:30px;
    font-size: 22px;
}
.follow ol li{
    height: 40px;
    
}
.name{
    margin-bottom: 15px;
    font-size:18px;
    font-weight: bold;

}

</style>