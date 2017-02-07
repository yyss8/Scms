<template>
    <div class='article-comment-field'>
        <h4>评论</h4>
        <div class='article-comments' v-for='comment in comments'>
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
                <i class='fa fa-thumbs-o-up'></i>
                [{{comment.like}}]
            </h6>
            <div class='article-comment-content' v-html='comment.content'></div>
            <div>
                <button class='btn btn-default btn-sm'>赞同</button>&nbsp;&nbsp;
                <button class='btn btn-default btn-sm'>回复</button>
            </div><br />
            <div class='article-subcomments' v-for='subcomment in comment.comments'>
                <div class='article-subcomment'>
                    <h6>
                        {{subcomment.title}}
                    </h6>
                    <h6>
                        <a href='#'>{{subcomment.name}}</a>
                        发表于:&nbsp;&nbsp;
                        <i class='fa fa-calendar'></i>
                        &nbsp;{{$parent.showDate(subcomment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class='fa fa-clock-o'></i>&nbsp;{{$parent.showTime(subcomment._id)}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class='fa fa-thumbs-o-up'></i>
                        [{{comment.like}}]
                    </h6>
                    <div class='article-comment-content' v-html='subcomment.content'></div>
                </div>
            </div>
        </div>
        <div class='article-post'>
            <button class='btn btn-default' v-if='!hidePost' @click='hidePost = !hidePost'>发表评论</button>
            <Edit-Post v-show='hidePost' style='width:100%' :preLoads='editLoads'>
                <input class='form-control' v-model='commentName' placeholder="输入名称" style='margin-top:10px;'/>
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
                commentName:""
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
                    success: (result)=>{
                        if (result.status == "ok"){
                            onResult(result.content,"success");
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
                this.$parent.confirmTxt = "是否删除评论";
                this.$parent.pendingAction =  {
                    url: `/post/${this.$route.params.id}/comments/${id}`,
                    type:'DELETE',
                    success: function(result) {
                        if (result.status == "ok"){
                            $("#confirmMsgField").modal('toggle');
                            location.reload();
                        }
                    }
                };
                $("#confirmMsgField").modal('toggle');
            }
        },
        components:{
            EditPost
        }
    }
</script>