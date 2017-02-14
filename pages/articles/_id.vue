<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info'>
                <div class='panel-body'>
                    <div v-if='!isEditing'>
                        <br />
                        <div class='article-title'>
                            <b>{{article.title}}</b>
                        </div>
                        <div class='article-info'>
                            <span><i class='fa fa-folder-open-o'></i>&nbsp;<a href='javascript:void(0)'>{{ article.category }}</a></span><br />
                            <span><i class='fa fa-calendar'></i>&nbsp; <a href='javascript:void(0)'>{{ $scms.showDate(article._id) }}</a></span><br />
                            <span><i class='fa fa-clock-o'></i>&nbsp;{{ $scms.showTime(article._id) }}</span>
                        </div>
                        <div class='article-content' v-html='$scms.toFullHtml(article.content)'></div>
                    </div>
                    <div class='article-content' v-if='isEditing' style='padding:0'>
                        <Edit-Post :preLoads='editLoads'>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model='article.allowComments'/>允许评论
                                </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <label>
                                    <input type="checkbox" v-model='article.allowSubComments'/>允许子评论
                                </label>
                            </div>
                        </Edit-Post>
                    </div><br />
                    <div class='article-btns'>
                        <div class='article-btns-right pull-right'>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='修改文章'><i class='fa fa-edit' @click='editorModifty'></i></a></span>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                            <span>&nbsp; &nbsp;&nbsp;<Share-View :id='article._id'></Share-View></span>
                        </div>
                    </div><br />
                    <Comments :comments='article.comments'></Comments>
                    <br />
                    <div class='article-lastandnext'>
                        <span>&nbsp;
                            <nuxt-link v-if='lastArticle != "No Result"' :to="{path:`/articles/${lastArticle._id}`}" active-class='admin-sidebar-active'><i class='fa fa-chevron-left'></i>&nbsp; {{$scms.showShortTitle(lastArticle.title,10)}}</nuxt-link>
                        </span>
                        <span>
                            <nuxt-link :to="{path:`/articles/${nextArticle._id}`}" active-class='admin-sidebar-active' v-if='nextArticle != "No Result"' class='pull-right'>
                                {{$scms.showShortTitle(nextArticle.title,10)}}&nbsp;
                                <i class='fa fa-chevron-right'></i>
                            </nuxt-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>
    import Comments from "~components/minorcomponents/comments.vue";
    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ConfirmView from "~components/minorcomponents/confirmview.vue";
    import ShareView from "~components/minorcomponents/sharearticle.vue";

    export default {
        async data({store,route,req,redirect}){

            if (req !== undefined){
                if (route.params.id !== undefined){
                    return {
                            article:req.article.article,
                            isEditing:route.query.isediting !== undefined && store.state.isLogin ? true:false,
                            lastArticle:req.article.lstArticle,
                            nextArticle:req.article.nxtArticle,
                            editLoads:{
                                article:req.article.article,
                                hasCategory:true,
                                categoryList:store.state.postCategories
                            }
                        }
                }else{
                    redirect('/');
                }
            }else{
                const { data } = await $.get(`/articles/${route.params.id}/client`);
                return {
                    article:data.article,
                    isEditing:route.query.isediting !== undefined && store.state.isLogin ? true:false,
                    lastArticle:data.lstArticle,
                    nextArticle:data.nxtArticle,
                    editLoads:{
                        article:data.article,
                        hasCategory:true,
                        categoryList:store.state.postCategories
                    }
                }
            }

        },
        methods:{
            deleteArticle(id){
                this.$refs.confirmView.getAction("是否删除该文章?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            $("#confirmMsgField").modal('toggle');
                            this.$router.push('/pages/1');
                        },
                        error: err => {
                            alert(err.responseJSON.content);
                        }         
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            editorModifty(){
                this.isEditing = !this.isEditing;
            },
            editorSubmit(data,onResult) {
                const postData = data;
                postData.id = this.article._id;
                postData.allowComments = this.article.allowComments;
                postData.allowSubComments = this.article.allowSubComments;

                $.ajax({
                    url: `/post/`,
                    type:'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: result => {
                        location.href = this.$route.path;
                    },
                    error: err => {
                        onResult(err.responseJSON.content,"error");
                    }
                });
            }

        },
        components:{
            Comments,
            EditPost,
            ConfirmView,
            ShareView
        }
    }
</script>