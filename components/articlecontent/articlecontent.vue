<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info' v-for='article in articles'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)' @click='articleDetail(article._id)'>{{ shortTitle(article.title) }}</a>
                    </div>
                    <div class='article-content' v-html='shortArticle(article.content)'>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)' :title='showTime(article._id)'>{{ showDate(article._id) }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <a><i class='fa fa-share' @click='shareArticle'></i></a>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='修改文章'><i class='fa fa-edit' @click='modify'></i></a></span>
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
        data(){
            return{
                articles:[],
                confirmTxt:"",
                confirmTitle:"",
                pendingAction:""
            }
        },
        mounted(){
            $.get('/post/first', r =>{
                if (r.status == "ok"){
                    this.$store.commit('getArticleNum',r.result.num);
                    this.articles = r.result.articles.reverse(); //显示最新
                }else{

                }
            });
        },
        methods:{
            loadArticles(pg){
                $.get(`/post/page/${pg}/${this.$store.state.articleNum}/`, r =>{
                    if (r.status == "ok"){
                        this.articles = r.result.reverse();

                    }
                });
            },
            articleDetail(id){
                alert(new Date(parseInt(id.substring(0, 8), 16) * 1000));
            },
            shortArticle(content){
                let newContent = content;
                let endNum = 100;
                const htmlPat = /<a href='.*?'>(.*?)<\/a>/g;
                const spanPat = /<span style='.*?'>(.*?)<\/span>/g;
                const patternObj = {
                    br:{
                        regExp:/<br\s*[\/]?>/g, //remove all break tag
                        newStr:" "
                    },
                    img:{
                        regExp:/<img\b[^>]*>/g, //remove all img tag
                        newStr:""
                    }
                }
                for (let pat in patternObj){
                    //replace html tags
                    newContent = newContent.replace(patternObj[pat].regExp,patternObj[pat].newStr);
                }

                let result;
                while ((result = spanPat.exec(newContent)) !== null) {
                    //replace span tags
                    newContent = newContent.replace(spanPat,spanPat.exec(newContent)[1]);
                }

                if (newContent.match(htmlPat) !== null ){
                    newContent.match(htmlPat).forEach(matched =>{
                        endNum += matched.length;
                    });
                }
                if (newContent.length < endNum){
                    return newContent
                };
                return newContent.substring(0,endNum) + "&nbsp; <a href='javascript:void(0)' @click='articleDetail(article._id)'>更多...</a>";
            },
            shortTitle(title){
                if (title.length > 20){
                    return title.substring(0,25) + " ...."
                }
                return title
                
            },
            showDate(id){
                const date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();

                return [year,month,day].join('/')
            },
            showTime(id){
                const date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
                
                return [date.getHours(),date.getMinutes(),date.getSeconds()].join(":")
            },
            modify(){

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

    .article-title{
        text-align: center;
        font-size:20px;
        font-weight: bold;
    }

    .article-title a{
        text-decoration: none;
        color:black;
    }

    .article-content{
        padding:30px 40px 30px 40px;
    }

    .article-btns{
        padding-left:40px;
    }

    .article-btns-right{
        position: relative;
        top:-5px;
        padding-right:40px;
    }

    .article-btns-right a{
        cursor: pointer;
        font-size: 20px;
        text-decoration: none;
    }

    .blog-content{
        overflow-y:auto;
    }

    @media screen and (max-width: 991px){
        .article-content{
            padding:30px 10px 30px 10px;
        }

        .article-btns{
            padding-left:10px;
        }

        .article-btns-right{
            padding-right:10px;
        }
    }
</style>