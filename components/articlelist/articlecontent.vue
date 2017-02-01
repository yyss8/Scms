<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info' v-for='article in $store.state.articles'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)' @click='articleDetail(article)'>{{ shortTitle(article.title) }}</a>
                    </div>
                    <div class='article-content' v-html='shortArticle(article.content,article._id)'>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)' :title='showTime(article._id)'>{{ showDate(article._id) }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <a><i class='fa fa-share' @click='shareArticle'></i></a>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='修改文章'><i class='fa fa-edit' @click='modify(article)'></i></a></span>
                            <span v-if='$store.state.isLogin' @click=''>&nbsp; &nbsp;&nbsp;<a title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
            <Switch-Page v-if='$store.state.articleNum > 5' v-on:loadArticle='loadArticles'></Switch-Page>
        </div>
        
        <div class="modal fade" id="confirmMsgField" tabindex="-1" role="dialog" aria-labelledby="confirmMsgFieldLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>{{ this.confirmTitle }}</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{confirmTxt}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click='sendAction'>确定</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import ResultView from "../minorcomponents/resultview.vue";
    import SwitchPage from "./switchpage.vue";

    export default {
        props:["pg"],
        data(){
            return{
                confirmTxt:"",
                confirmTitle:"",
                pendingAction:""
            }
        },
        methods:{
            loadArticles(pg){
                $.get(`/post/page/${pg}/${this.$store.state.articleNum}/`, r =>{
                    if (r.status == "ok"){
                        this.$store.commit('getArticle',r.result)
                    }
                });
            },
            articleDetail(article){
                this.$store.commit('loadArticleDetail',article);
                this.$router.push({path:`/articles/${article._id}`,params:article});
            },
            shortArticle(content,id){
                let endNum = 150;
                const patternObj = {
                    code:{
                        reg:/\[code\](.*?)\[\/code]/g
                    },
                    b:{
                        reg:/\[b\](.*?)\[\/b\]/g,
                        newStr:"$1"
                    },
                    img:{
                        reg:/\[img(.*?)](.*?)\[\/img\]/g,
                    },
                    color:{
                        reg:/\[c='(.*?)'\](.*?)\[\/c\]/g,
                        newStr:"$2"
                    },
                    size:{
                        reg:/\[s='(.*?)'\](.*?)\[\/s\]/g,
                        newStr:"$2",
                    },
                    i:{
                        reg:/\[i\](.*?)\[\/i\]/g,
                        newStr:"$1"
                    },
                    quote:{
                        reg:/\[quote](.*?)\[\/quote]/g,
                        newStr:"$1"
                    },
                    u:{
                        reg:/\[u\](.*?)\[\/u\]/g,
                        newStr:"$1"
                    }
                };

                let newContent = content.replace(/<br\s*[\/]?>/g," ").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
                let matched;

                for (let pat in patternObj){
                    //replace html tags
                     switch (pat){
                        case "img":
                            matched = newContent.match(patternObj[pat].reg);
                            newContent = newContent.replace(patternObj[pat].reg,`<a href='/articles/${id}'>查看图片</a>`);
                            if (matched !== null){
                                endNum += (`<a href='/articles/${id}'>查看源码</a>`.length) * matched.length;
                            }
                            break;
                        case "code":
                            matched = newContent.match(patternObj[pat].reg);
                            newContent = newContent.replace(patternObj[pat].reg,`<a href='/articles/${id}'>查看源码</a>`);
                            if (matched !== null){
                                endNum += (`<a href='/articles/${id}'>查看源码</a>`.length) * matched.length;
                            }
                            break;
                        default:
                            newContent = newContent.replace(patternObj[pat].reg,patternObj[pat].newStr);
                    }
                }

                if (newContent.length < endNum){
                    return newContent
                };
                return newContent.substring(0,endNum) + ` <a href='/articles/${id}'>更多...</a>`;
            },
            shortTitle(title){
                if (title.length > 20){
                    return title.substring(0,25) + " ...."
                }
                return title
                
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
            modify(article){
                this.$store.commit('loadArticleDetail',article);
                this.$router.push({path:`/articles/${article._id}`,query:{isediting:true}})
            },
            shareArticle(){

            },
            deleteArticle(id){
                this.confirmTitle = "删除文章"
                this.confirmTxt = "是否删除文章";
                this.pendingAction =  {
                    url: `/post/${id}/`,
                    type:'DELETE',
                    success: function(result) {
                        if (result.status == "ok"){
                            $("#confirmMsgField").modal('toggle');
                            location.reload();
                        }
                    }
                };
                $("#confirmMsgField").modal('toggle');
            },
            sendAction(){
                $.ajax(this.pendingAction);
            }
        },
        components:{
            ResultView,
            SwitchPage
        },
        watch:{
            actionPending(){
                if (this.actionPending == ""){
                    this.confirmTitle = "";
                    this.confirmTxt = "";
                }
            }
        }
    }
</script>

<style>


</style>