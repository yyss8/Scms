<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info' v-for='article in articles'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)' @click='articleDetail(article._id)'>{{ article.title }}</a>
                    </div>
                    <div class='article-content' v-html='shortArticle(article.content)'>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.date }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <a><i class='fa fa-share' @click='shareArticle'></i></a>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='修改文章'><i class='fa fa-edit' @click='modify'></i></a></span>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='删除文章'><i class='fa fa-trash' @click='deleteArticle'></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                articleNum:0,
                articles:[]
            }
        },
        mounted(){
            $.get('/post/first', r =>{
                if (r.status == "ok"){
                    this.articleNum = r.result.num;
                    this.articles = r.result.articles;
                }else{

                }
            });
        },
        methods:{
            articleDetail(id){
                alert(id);
            },
            shortArticle(content){
                let newContent = content;
                let endNum = 100;
                const htmlPat = /<a href='.*?'>(.*?)<\/a>/g
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
                
                newContent.match(htmlPat).forEach(matched =>{
                    endNum += matched.length;
                });
                if (newContent.length < endNum){
                    return newContent
                };
                return newContent.substring(0,endNum) + "&nbsp; <a href='javascript:void(0)' @click='articleDetail(article._id)'>更多...</a>";
            },
            modify(){

            },
            shareArticle(){

            },
            deleteArticle(){
                
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
</style>