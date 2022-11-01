<template>
    <div class="login-box" >
        <p>密码登录</p>
        <i class="el-icon-user" aria-hidden="true"></i>
        <input type="text"  placeholder="邮箱" v-model="email" style="margin-top:18px;" />
        <br/>
        <i class="el-icon-key" aria-hidden="true"></i>
        <input type="password"  placeholder="密码" v-model="password"/><br>
        <button  class="btn_03" @click="login">登录</button><br/>
        <div id="a">
            <router-link to='/register'>立即注册</router-link>
        </div>
        
    </div>

    
</template>

<script>
import {loginAPI} from '../utils/apiList';

export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods: {
        login(){
            var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//正则表达式
            if(this.email.trim()==="" ||this.password.trim() ===""){
                 this.$message({
                    message:'邮箱或密码不能为空！',
                    showClose: true,
                    type:'error'
                    })
                return;
            }
            if(!reg.test(this.email)){
                this.$message({
                    message:'邮箱格式不正确！',
                    showClose: true,
                    type:'error'
                    })
                return;
            }
            //登录信息验证请求
            loginAPI({
                email:this.email,
                password:this.password
            }).then((result) =>{
                if(result){
                    console.log("登录响应的数据",result);
                    this.$cookie.set('avatar',result)

                        this.$router.push({
                            name:'zhihu',
                        })
                }
            }).catch(err=>{

            })
               
        }
    }
}
</script>

<style scoped>
body{
    background-color:skyblue;
}

.login-box {
    border: 1px solid white;
    border-radius:5px;
    width: 30%;
    text-align: center;
    margin: 0 auto;
    margin-top: 15%;
    background: white;
    padding: 30px 50px;
}

   .btn_03{
    border: 0; /* 取消按钮的边界 */
    width: 150px; /* 设置合适的按钮的长和宽 */
    height: 30px;
    margin-top: 10px; /* 设置合适的上部外框的宽度，增加与上面的password框的距离 */
    font-size: 18px; /* 修改按钮文字的大小 */
    color: white; /* 修改按钮上文字的颜色 */
    border-radius: 25px; /* 将按钮的左右边框设置为圆弧 */
    background-image: linear-gradient(to right, #00dbde 0%, hotpink 100%); /* 为按钮增加渐变颜色 */
    cursor:pointer;
}

.login-box  input {
    clear:both;
    margin-bottom:10px;
    margin-right:10px;
    width: 200px; /* 设置合适的宽度 */
    border: 0; /* 首先将边界取消，方便下面修改下部边界宽度 */
    border-bottom: 3px solid gray; /* 将下边界进行修改，显示出横线效果 */
    font-size: 16px; /* 将字体适当的变大加粗 */
    background: #ffffff00; /* 将输入框设置为透明 */
    /*color: white; !* 上面的文本颜色设置为白色，但是placeholder的颜色要单独设置 *!*/
    padding: 5px 10px; /* 为了placeholder的内容不是顶格显示，增加内部边界 */
    outline:none;
}
    #a{
     margin:0px;
        }
        #a a{
            font-size:12px;
            color: gray;
            text-decoration: none;
            display: inline-block;
            margin-top:20px;
        }
        #a a:hover{
            color:orange;
            text-decoration: underline;
        }
</style>