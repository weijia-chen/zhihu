import {get,post} from './api'

/**
 * @function 请求问题的类别
 * @params 问题
 * @return {Promise}
 */

export   function categoryAPI(params){
    return get('/qa/topic/searchTopics',params)
}


/**
 * @function  登陆验证
 * @params {email,password}
 */

export function loginAPI(params) {
     return post('/user/user/login',params)
}

/**
 * @function 关注人信息
 * @params {currentPage}
 */

export function followMessageAPI (params) 
{
    return get('/user/messageFollow/searchMessageFollow/'+params)
}

/**
 * @function 问题详情
 * @params (problemId)
 */

export function problemAPI(params=-1){
  console.log("参数...",params);
    if(params != -1)
        return get('/qa/problem/searchProblem/'+params)
    
}

/**
 * @function 取消关注问题
 * @params (problemId)
 */

 export function cancelproblemAPI(params){
    return get('/user/follow/delFollowProblem/'+params)
}

/**
 * @function 关注问题
 * @params (problemId)
 */
export function followProblem(params){
    return get('/qa/problem/followProblem/'+params)
}

/**
 * @function 获得问题下的回答
 * @params (problemId,current)
 * 
 */

export function getReplyAPI(params){
  if(params)
    return get('/qa/reply/searchReply/'+params.problemId+'/'+params.current)
}
/**
 * @function 查看回复下的评论
 * @param {replyId} 
 *  
 */
export function commentListAPI(params){
    return get('/qa/comment/searchComments/'+params)
}

/**
 * @function 发表评论
 * @param {replyId,content} 
 *  
 */
 export function toCommentAPI(params){
    return post('/qa/comment/insertComment',params)
}

/**
 * @function 获取用户的收藏夹
 * @params {replyId}
 */
export function getFavoritesAPI(params){
    return get('/qa/collect/searchFavorites/'+params)
}

/**
 * @function 收藏问题
 * @params {replyId,fid}
 */
 export function toCollectAPI(params){
     return get('/qa/collect/collectReply',params)
 }

 /**
  * @function 取消收藏回答
  * @params {replyId,fid}
  */

 export function cancelCollectAPI(params){
     return get('/qa/collect//delCollect/'+params.replyId+'/'+params.fid)
 }

 /**
  * @function 添加收藏夹
  * @param
  */

 /**
  * @function 赞同回答
  * @params {reply.id}
  * 
  */
export function praiseReplyAPI(params){
    return get('/qa/like/reply/'+params)
}
 /**
  * @function 查看自己关注的问题
  * @params {reply.id}
  * 
  */
  export function searchFollowProblemsAPI(){
    return get('/qa/problem/searchFollowProblems')
}
/**
 * @function 写问题
 * @params {promble}
 */
export function writeProAPI(params){
    return post('/qa/problem/insert',params)
}

/**
 * @function 改变消息页面
 * @params {currentPage}
 */

export function ChangeMessAPI(params){
    return get('/user/messageme/searchMessageMe/'+params)
}

/**
 * @function 获取热搜
 * @params 
 */
export function GetHotMessAPI(){
    return get('/qa/problem/searchHot')
}

/**
 * @function 获取关注的话题
 * @params 
 */
 export function GetFollowTopicAPI(){
    return get('/user/follow/searchFollowTopics')
}

/**
 * @function 取消关注话题
 * @params topicId
 */
export function cancelTopicAPI(params){
    return get('/user/follow/delFollowTopic/'+params)
}

/**
 * @function 关注话题
 * @params topicId
 */
 export function followTopicAPI(params){
    return get('/user/follow//followTopic/'+params)
 }
//  /qa/problem/searchProblem/undefined
 /**
 * @function 获取全部话题
 * @params 
 */
  export function getTopicAPI(){
    return get('/qa/topic/searchTopics')
 }
 
 /**
 * @function 获取话题下的问题
 * @params {topicId,currentPage}
 */
  export function getTopicProAPI(params){
    return get('/qa/problem/searchProblemByTopic?topicId='+params.topicId+"&current="+params.currentPage)
 }


 
  /**
 * @function 获取我发布的问题
 * @params 
 */
   export function getMyPrombleAPI(){
    return get('/qa/problem/searchProblemsByUserId')
 }

  /**
 * @function 删除发布的问题
 * @params {problemId}
 */
   export function deleteMyPrombleAPI(params){
    return get('/qa/problem//delProblem/'+params)
 }
 
 

   /**
 * @function 关注的用户
 * @params {}
 */
    export function getMyFollowUserAPI(){
        return get('/user/follow/searchFollowUsers')
     }

/**
 * @function 取消关注用户
 * @params {userId}
 */
    export function cancleFollowUserAPI(params){
        return get('/user/follow/delFollowUser/'+params)
     }
/**
 * @function 关注用户
 * @params {userId}
 */
 export function followUserAPI(params){
    return get('/user/follow/followUser/'+params)
 }

/**
 * @function 获取我的回答
 * @params {}
 */
 export function getMyReplyAPI(){
    return get('/qa/reply/searchReplyVosByUserId')
 }

 /**
 * @function 删除回答
 * @params {replyId}
 */
  export function delMyReplyAPI(params){
    return get('/qa/reply/delReply/'+params)
    
 }

 /**
 * @function 获取我的收藏夹
 * @params {}
 */
  export function getFavsAPI(){
    return get('/qa/collect/searchFavoritesByUser')
    
 }
 

  /**
 * @function 创建收藏夹
 * @params {name}
 */
   export function creFavsAPI(params){
    return get('/qa/collect/insertFavorites/'+params)
    
 }
  /**
 * @function 删除收藏夹
 * @params {fid}
 */
  export function detFavsAPI(params){
    return get('/qa/collect/delFavorites/'+params)
    
 }

  /**
 * @function 查看收藏夹下的回答
 * @params {fid}
 */
   export function showFavsProAPI(params){
    return get('/qa/collect/searchCollectReplyByFavorites/'+params)
    
 }

  /**
 * @function 写回答
 * @params {problemId,content,issue}
 */
   export function writeReplyAPI(params){
    return post('/qa/reply/insertReply',params)
    
 }

  /**
 * @function 更新草稿箱
 * @params {draftId,content,issue}
 */
   export function updateReplyAPI(params){
    return post('/qa/reply/updateDrafts',params)
    
 }

   /**
 * @function 查询草稿箱
 * @params 
 */
    export function  searchDraftAPI(params){
        return get('/qa/reply/searchDrafts',params)
        
     }

/**
 * @function 搜索
 * @params 
 */
export function  searchAPI(params){
        return get('/qa/problem/search/'+params)
}

  /**
      * @function 查询用户的信息
      * @params
      */
     
   export function searchUser(){
    return get('/user/user/showUser')
}


/**
 * @function 修改密码
 * @params {old,new}
 */

 export function changePswAPI(params){
   return get(' user/user/updatePassword/'+params.oldPass+'/'+params.newPass)
}

/**
 * @function 获取关注话题的消息
 * @params {currentPage}
 */

 export function getFollowTopicMessageSPI(params){
  return get('/user/messagetopic/searchMessageTopics/'+params)
}

/**
 * @function 获取关注问题的消息
 * @params {currentPage}
 */

 export function getFollowProMessageSPI(params){
  return get('/user/messageProblem/searchMessageProblems/'+params)

}

export   function catAdvice(){
  return get('/user/user/catAdvice')
}