<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <article class='panel panel-info article-body' v-for='(article, articleIndex) in $store.state.articles' :key='`article-${articleIndex}`'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <nuxt-link :to="{path:`/articles/${article._id}`}">
                            {{ $scms.showShortTitle(article.title,20) }}
                        </nuxt-link>
                    </div>
                    <div class='article-content' v-html='$scms.showShortArticle(article.content,article._id)'>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-eye'></i>&nbsp; &nbsp;{{ article.click }}</span><br />
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)' :title='$scms.showTime(article._id)' @click='toDate(article._id)'>{{ $scms.showDate(article._id) }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)' @click='toCategories(article.category)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='修改文章'><i class='fa fa-edit' @click='modify(article)'></i></a></span>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                            <Share-View :id='article._id'></Share-View>
                        </div>
                    </div>
                </div>
            </article>
            <Switch-Page v-if='$store.state.articleNum>5'></Switch-Page>
        </div>

        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

    import ShareView from "~/components/minorcomponents/sharearticle.vue";
    import SwitchPage from "~/components/articlelist/switchpage.vue";
    import ResultView from "~/components/minorcomponents/resultview.vue";
    import ConfirmView from "~/components/minorcomponents/confirmview.vue";

    export default {
        props:["pg"],
        data(){
            return{};
        },
        methods:{
            articleDetail(article){
                this.$router.push({path:`/articles/${article._id}`});
            },
            modify(article){
                this.$store.commit('loadArticleDetail',article);
                this.$router.push({path:`/articles/${article._id}`,query:{isediting:true}})
            },
            toCategories(cg){
                this.$store.state.postCategories.forEach(category =>{
                    if (category.name === cg){
                        this.$router.push(`/categories/${category.id}/pages/1`);
                    }
                });
            },
            toDate(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();
                const postDate = [month,day,year].join('-');
                this.$router.push(`/date/${postDate}/pages/1`);
            },
            deleteArticle(id){
                this.$refs.confirmView.getAction("是否删除该文章?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error:result => {
                            alert(result.responseJSON.content);
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            }
        },
        components:{
            ResultView,
            SwitchPage,
            ConfirmView,
            ShareView
        }
    }
</script>