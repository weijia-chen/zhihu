<template>
    <div>
     <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 600px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
     </div>

      <el-button type="primary" style="float:right;margin-top:10px;" @click="toPost">提交回答</el-button>
      <el-button type="primary" style="float:right;margin-right:15px;margin-top:10px;" @click="toSave">保存草稿</el-button>
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {writeReplyAPI,updateReplyAPI} from '../utils/apiList'
export default {
    name:'Answerquestion',
    components:{Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { 
                placeholder: '请输入内容...',
                MENU_CONF:{
                    uploadImage:{
                            server: '/user/img/upload',
                            maxFileSize: 10 * 1024 * 1024, // 10M
                            withCredentials: true,
                            fieldName: 'file',
                            onBeforeUpload(file) {
                            // file 选中的文件，格式如 { key: file }
                            console.log("file:",file);
                            return file
                            },
                                // 上传进度的回调函数
                            onProgress(progress) {
                                // progress 是 0-100 的数字
                                console.log('progress', progress)
                            },
                                // 单个文件上传成功之后
                            onSuccess(file, res) {
                                console.log(`${file.name} 上传成功`, res)
                            },
                                // 单个文件上传失败
                            onFailed(fil, res) {
                                console.log(`${file.name} 上传失败`, res)
                            },
                            // 上传错误，或者触发 timeout 超时
                            onError(file, err, res) {
                                console.log(`${file.name} 上传出错`, err, res)
                            },

                    },
                }
             },
            mode: 'default', // or 'simple'
            problemId:'',
            issue:0, 
            draftId:'' //草稿回答的id
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        toPost(){
            this.issue=1  //发布
            if(this.problemId==0){
                this.update();
            }else{
                console.log("执行1次.."); 
                this.write();
            }
            
        },
        toSave(){
            if(this.problemId==0){
                this.update();
            }else{
                this.write();
            }
        },
        write(){   
          
            if(this.editor.getText().trim()==''){
                this.$message(
                    {
                        message:'回答不能为空',
                        type:'error'
                    }
                );
                this.html=''
                return;
            }
            writeReplyAPI({
                problemId:this.problemId,
                content:this.editor.getHtml(),
                issue:this.issue,
            }).then(res=>{
               
                this.$bus.$emit('comment',this.issue) //保存为草稿的传入0
            }).catch(err=>{
                console.log(err)
            })
        },
        update(){
            if(this.editor.getText().trim()==''){
                this.$message(
                    {
                        message:'回答不能为空',
                        type:'error'
                    }
                );
                this.html=''
                return;
            }
            updateReplyAPI({
                id:this.draftId,
                content:this.editor.getText(),
                issue:this.issue,
            }).then(res=>{
                this.$bus.$emit('load',false)//关闭草稿箱页面的弹窗和刷新草稿箱页面
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
    
        if(this.$route.query.problemId==0){ //先判断当前：修改草稿回答 or 写回答
            this.problemId=this.$route.query.problemId
            this.draftId=this.$route.query.draftId
            //将草稿箱的内容放置在编辑器内显示
            setTimeout(() => {
                this.html = `<p>${this.$route.query.content}</p>`
            }, 500)
            }else{
                this.problemId=this.$route.query.problemId
            }
        
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>

</style>