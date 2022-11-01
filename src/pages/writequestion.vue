<template>
    <div>
        <el-form ref="problem" :model="problem" label-width="110px" style="margin-top:30px">
                <el-form-item label="问题：">
                    <el-input v-model="problem.title" placeholder='写下你的问题，准确地描述问题更容易得到解答'></el-input>
                </el-form-item>
                <el-form-item label="描述(可选)：">
                    <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 14}" v-model="problem.content"></el-input>
                </el-form-item>
                <el-form-item label="所属话题：">
                      <el-select v-model="problem.topicId" filterable placeholder="请选择">
                        <el-option
                            v-for="topic in topics"
                            :key="topic.id"
                            :label="topic.topicName"
                            :value="topic.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onsubmit">提交</el-button>
                </el-form-item>
                </el-form>
    </div>
</template>

<script>
import {categoryAPI,writeProAPI} from '../utils/apiList'

export default {
    
    name:'Writequestion',
    data() {
            return {
                problem:{
                    title:'',
                    content:'',
                    topicId:'',
                },
                topics:[],
            };
        },
     mounted() {
        categoryAPI(this.problem).then(res=>{
            this.topics = res;
        })
    },
        
    methods: {
        onsubmit(){
            if(this.problem.title.trim()==="") {
                this.$message({showClose: true,message: '题目不能为空，请输入题目',type: 'warning'})
                this.problem.title=''
                return;
            }
            else{
                writeProAPI(this.problem).then(res=>{
                    console.log('发送成功')
                    this.problem.title=''
                    this.problem.content=''
                    this.problem.topicId=''
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
    },
    }




</script>

<style>


</style>