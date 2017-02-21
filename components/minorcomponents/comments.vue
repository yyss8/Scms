<template>
    <div class='article-comment-field'>
        <div class='article-comment-title'>
            <span class='h4'>评论</span>
        </div>
        <div class='article-comments' v-for='(comment,index) in comments'>
            <div>
                <a class='pull-right' @click='remove(comment._id)' v-if='$store.state.isLogin'><i class='fa fa-times'></i></a>
                <h5>{{comment.title}}</h5>
            </div>
            <h6>
                <a href='#'>{{comment.name}}</a>
                发表于:&nbsp;&nbsp;
                <i class='fa fa-calendar'></i>
                &nbsp;{{$scms.showDate(comment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                <i class='fa fa-clock-o'></i>
                &nbsp;{{$scms.showTime(comment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='javascript:void(0)' @click='like(comment._id,index)'><i class='fa fa-thumbs-o-up'></i>[{{comment.like.num}}]</a>
            </h6>
            <div class='article-comment-content' v-html='$scms.toFullHtml(comment.content)'></div>
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
                                <div class='row'>
                                    <div class='col-md-9'>
                                        <input class='form-control' placeholder="昵称" v-model='replyName' :readonly='anonyReply'/>
                                    </div>
                                    <div class='col-md-3'>
                                        <div class='checkbox' style='margin-top:5px;'>
                                            <label>
                                                <input type='checkbox' v-model='anonyReply'/>匿名发布
                                            </label>
                                        </div>
                                    </div>
                                </div><br />
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
                        &nbsp;{{$scms.showDate(subid)}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class='fa fa-clock-o'></i>&nbsp;{{$scms.showTime(subid)}}&nbsp;&nbsp;&nbsp;&nbsp;
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
            <br v-if='comments.length == 0' />
            <button class='btn btn-default' v-if='!hidePost' @click='hidePost = !hidePost'>发表评论</button>
            <Result-View class='pull-right' ref='resultView'></Result-View>
            <Edit-Post v-show='hidePost' style='width:100%' :preLoads='editLoads'>
                <div class='row'>
                    <div class='col-md-10'>
                        <input class='form-control' v-model='commentName' placeholder="输入昵称" style='margin-top:10px;' :readonly='anonyReply'/>
                    </div>
                    <div class='col-md-2'>
                        <div class='checkbox' style="position: relative;top:5px;">
                            <label>
                                <input type='checkbox' v-model='anonyReply'/>匿名发布
                            </label>
                        </div>
                    </div>
                </div>
            </Edit-Post>
        </div>
    </div>
</template>

<script>

    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ResultView from "~components/minorcomponents/resultview.vue";

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
                replyContent:"",
                anonyReply:true
            }
        },
        props:[
            'comments'
        ],
        methods:{
            submit(data,onResult){
                if (!this.anonyReply && this.commentName == ""){
                    this.$refs.resultView.sendMsg("请输入回复名称或选择匿名回复.","error");
                }else{
                    const name = this.anonyReply ? "游客":this.commentName;
                    let postData = data;
                    postData.id = this.$route.params.id;
                    postData.name = name;

                    $.ajax({
                        url: `/post/${postData.id}/comments`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(postData),
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            onResult(err.responseJSON.content,"error");
                        }
                    });
                }

            },
            cancel(){
                this.hidePost = !this.hidePost;
            },
            remove(id){
                this.$parent.$refs.confirmView.getAction("是否删除该评论？",function() {
                    $.ajax({
                        url: `/post/${this.$route.params.id}/comments/${id}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            this.$parent.$refs.confirmView.onResult(err.responseJSON.content,"error");
                        }      
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            showDate(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();

                return [year,month,day].join('/')
            },
            showTime(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                
                return [date.getHours(),date.getMinutes(),date.getSeconds()].join(":")
            },
            removeSub(id,subid){
                this.$parent.$refs.confirmView.getAction("是否删除子评论？",function() {
                    $.ajax({
                        url: `/post/${this.$route.params.id}/comments/${id}/subcomments/${subid}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            this.$parent.$refs.confirmView.onResult(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            reply(id){
                if (!this.anonyReply && this.replyName == ""){
                    this.$refs.resultView.sendMsg("请输入回复名称或选择匿名回复.","error");
                }else{
                    const name = this.anonyReply ? "游客":this.replyName;
                    const postData = {
                        id,
                        name,
                        content:this.replyContent
                    }

                    $.ajax({
                        url: `/post/${this.$route.params.id}/comments/${id}/`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(postData),
                        success: result => {
                            location.reload();
                        },
                        error: err =>{
                            this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                        }
                    });
                }
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
                        if (this.$parent.article.comments[index].like.liked){
                            this.$refs.resultView.sendMsg("取消点赞成功","success");
                            this.$parent.article.comments[index].like.num -= 1;
                        }else{
                            this.$refs.resultView.sendMsg("点赞成功","success");
                            this.$parent.article.comments[index].like.num += 1;
                        }
                        this.$parent.article.comments[index].like.liked = !this.$parent.article.comments[index].like.liked;
                    },
                    error: err =>{
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            },
            replyLike(commentid,index,subcommentid){
                $.ajax({
                    url: `/post/${this.$route.params.id}/comments/${commentid}/subcomments/${subcommentid}/like`,
                    type:'PUT',
                    contentType: "application/json",
                    success: (result)=>{
                        if (this.$parent.article.comments[index].comments[subcommentid].like.liked){
                            this.$parent.article.comments[index].comments[subcommentid].like.num -= 1;
                        }else{
                            this.$parent.article.comments[index].comments[subcommentid].like.num += 1;
                        }
                        this.$parent.article.comments[index].comments[subcommentid].like.liked = !this.$parent.article.comments[index].comments[subcommentid].like.liked;
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        components:{
            EditPost,
            ResultView
        }
    }
</script>