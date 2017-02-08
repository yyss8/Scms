<template>
    <div class='article-comment-field'>
        <h4>评论</h4>
        <div class='article-comments' v-for='(comment,index) in comments'>
            <div>
                <a class='pull-right' @click='remove(comment._id)' v-if='$store.state.isLogin'><i class='fa fa-times'></i></a>
                <h5>{{comment.title}}</h5>
            </div>
            <h6>
                <a href='#'>{{comment.name}}</a>
                发表于:&nbsp;&nbsp;
                <i class='fa fa-calendar'></i>
                &nbsp;{{$parent.showDate(comment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                <i class='fa fa-clock-o'></i>
                &nbsp;{{$parent.showTime(comment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='javascript:void(0)' @click='like(comment._id,index)'><i class='fa fa-thumbs-o-up'></i>[{{comment.like.num}}]</a>
            </h6>
            <div class='article-comment-content' v-html='$parent.toHtml(comment.content)'></div>
            <div>
                <button class='btn btn-default btn-sm' @click='like(comment._id,index)'>{{ !comment.like.liked ? "点赞":"取消点赞"}}</button>&nbsp;&nbsp;
                <span class="dropdown">
                    <button class='btn btn-default btn-sm' @click='toggleReply(index)'>回复</button>
                    <div class="dropdown-menu" style='padding:0;width:500px;'>
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" @click='toggleReply(index)'>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="modal-title">回复 {{comment.name}} 的评论</h5>

                            </div>
                            <div class="modal-body">
                                <input class='form-control' placeholder="昵称" v-model='replyName' /><br />
                                <input class='form-control' placeholder="回复内容" v-model='replyContent' />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click='reply(comment._id)'>发表</button>
                                <button type="button" class="btn btn-secondary" @click='toggleReply(index)'>取消</button>
                            </div>
                        </div>
                    </div>
                </span>
            </div><br />
            <div class='article-subcomments' v-for='(sub,subid) in comment.comments'>
                <div class='article-subcomment'>
                    <h6>
                        <a class='pull-right' @click='removeSub(comment._id,subid)' v-if='$store.state.isLogin'><i class='fa fa-times'></i></a>
                        <a href='#'>{{sub.name}}</a>
                        发表于:&nbsp;&nbsp;
                        <i class='fa fa-calendar'></i>
                        &nbsp;{{$parent.showDate(subid)}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class='fa fa-clock-o'></i>&nbsp;{{$parent.showTime(subid)}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href='javascript:void(0)' @click='replyLike(comment._id,index,subid)'><i class='fa fa-thumbs-o-up'></i>[{{sub.like.num}}]</a>
                    </h6>
                    <div class='article-comment-content'>{{sub.content}}</div>
                    <div>
                    <button class='btn btn-default btn-sm' @click='replyLike(comment._id,index,subid)'>{{ !sub.like.liked ? "点赞":"取消点赞"}}</button>&nbsp;&nbsp;
                    </div><br />
                </div>
            </div>
        </div>
        <div class='article-post'>
            <button class='btn btn-default' v-if='!hidePost' @click='hidePost = !hidePost'>发表评论</button>
            <Edit-Post v-show='hidePost' style='width:100%' :preLoads='editLoads'>
                <input class='form-control' v-model='commentName' placeholder="输入昵称" style='margin-top:10px;'/>
            </Edit-Post>
        </div>
    </div>
</template>

<script>

    import EditPost from "~components/minorcomponents/posteditor.vue";

    export default {
        data(){
            return{
                hidePost:false,
                editLoads:{
                    hasCategory:false,
                    submit:this.submit,
                    cancel:this.cancel
                },
                commentName:"",
                replyName:"",
                replyContent:""
            }
        },
        props:[
            'comments'
        ],
        methods:{
            submit(data,onResult){
                let postData = data;
                postData.id = this.$route.params.id;
                postData.name = this.commentName;

                $.ajax({
                    url: `/post/${postData.id}/comments`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: result => {
                        if (result.status == "ok"){
                            onResult(result.content,"success");
                            location.reload();
                        }else{
                            onResult(result.content,"error");
                        }
                    }
                });
            },
            cancel(){
                this.hidePost = !this.hidePost;
            },
            remove(id){
                this.$parent.confirmTitle = "删除评论"
                this.$parent.confirmTxt = "是否删除评论？";
                this.$parent.pendingAction =  {
                    url: `/post/${this.$route.params.id}/comments/${id}`,
                    type:'DELETE',
                    success: result => {
                        if (result.status == "ok"){
                            $("#confirmMsgField").modal('toggle');
                            location.reload();
                        }
                    }
                };
                $("#confirmMsgField").modal('toggle');
            },
            removeSub(id,subid){
                this.$parent.confirmTitle = "删除子评论"
                this.$parent.confirmTxt = "是否删除子评论？";
                this.$parent.pendingAction =  {
                    url: `/post/${this.$route.params.id}/comments/${id}/subcomments/${subid}`,
                    type:'DELETE',
                    success: result => {
                        if (result.status == "ok"){
                            $("#confirmMsgField").modal('toggle');
                            location.reload();
                        }
                    }
                };
                $("#confirmMsgField").modal('toggle');
            },
            reply(id){

                const postData = {
                    id,
                    name:this.replyName,
                    content:this.replyContent
                }

                $.ajax({
                    url: `/post/${this.$route.params.id}/comments/${id}/`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        if (result.status == "ok"){
                            location.reload();
                        }else{
                            
                        }
                    }
                });
            },
            toggleReply(index){
                $(".dropdown-menu").eq(index).toggle();
            },
            like(id,index){
                $.ajax({
                    url: `/post/${this.$route.params.id}/comments/${id}/like`,
                    type:'PUT',
                    contentType: "application/json",
                    success: (result)=>{
                        if (result.status == "ok"){
                            if (this.$parent.article.comments[index].like.liked){
                                this.$parent.article.comments[index].like.num -= 1;
                            }else{
                                this.$parent.article.comments[index].like.num += 1;
                            }
                            this.$parent.article.comments[index].like.liked = !this.$parent.article.comments[index].like.liked;
                        }else{
                            
                        }
                    }
                });
            },
            replyLike(commentid,index,subcommentid){
                $.ajax({
                    url: `/post/${this.$route.params.id}/comments/${commentid}/subcomments/${subcommentid}/like`,
                    type:'PUT',
                    contentType: "application/json",
                    success: (result)=>{
                        if (result.status == "ok"){
                            if (this.$parent.article.comments[index].comments[subcommentid].like.liked){
                                this.$parent.article.comments[index].comments[subcommentid].like.num -= 1;
                            }else{
                                this.$parent.article.comments[index].comments[subcommentid].like.num += 1;
                            }
                            this.$parent.article.comments[index].comments[subcommentid].like.liked = !this.$parent.article.comments[index].comments[subcommentid].like.liked;
                        }else{
                            
                        }
                    }
                });
            }
        },
        components:{
            EditPost
        }
    }
</script>