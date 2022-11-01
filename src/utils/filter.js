import dayjs from "dayjs"
import Vue from 'vue'
// 全局过滤器
Vue.filter('timeFormater',function(value,str='YYYY年MM月DD日 HH:mm:ss'){
    return dayjs(value).format(str)
  })