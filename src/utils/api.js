import axios from 'axios'
import router from '../router'
import qs from 'qs'
import { Message } from 'element-ui'

//响应拦截器
axios.interceptors.response.use(
    response => {
         var code=response.data.code
        if(response.status==200){
            console.log('response.data.code:',code);
            //未登录放回4001
            if(code ===4001){
               Message.error({
                   message:'尚未登录，请登录',
                   showClose:true
               });
               this.$router.push({
                   name:'login',
               })
               return;
            }

            if(code!=200){
                Message.error({
                    message:response.data.message,
                    showClose:true
                });
                return;
            }

            //请求成功
            if(response.data.message){
                Message.success({
                    message:response.data.message,
                    showClose:true
                });
            }
        }
        
        return response.data;
    },
    error => {
        var code=error.response.code
        console.log("error",code);
        if(code == 504||code == 404){
            Message.error({
                message:'服务器被吃了o( ╯□╰ )o',
                showClose:true
            });
        }else if(code==403){
            Message.error({
                message:'权限不足，请联系管理员！',
                showClose:true
            });
        }else if(error.response.code==4001){
            Message.error({
                message:'尚未登录，请登录',
                showClose:true
            });
            router.replace('/');
        }else{
            if(error.response.data.message){
                Message.error({
                    message:error.response.data.message,
                    showClose:true
                });
            }else{
                Message.error({
                    message:'未知错误！',
                    showClose:true
                })
            }
        }
        return;
    }
)



//封装axios中的get方法
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(`${url}`,{
            params:params
        })
        .then((res) =>{
            resolve(res.data)
        }).catch(err =>{
            reject(err.data)
        })
    });
}

//封装axios中的post方法
export function post(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.post(`${url}`,params)
        .then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
           reject(err.data)
        })
    });
}


