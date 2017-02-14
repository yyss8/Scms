<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='category-title'><h3><b>{{ title }}</b></h3></div>
            <div class='panel panel-info article-body' v-if='data.currentArticles.length != 0' v-for='article in data.currentArticles'>
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
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)' :title='$scms.showTime(article._id)' @click='toDate(article._id)'>{{ $scms.showDate(article._id) }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)' @click='toCategories(article.category)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='修改文章'><i class='fa fa-edit' @click='modify(article)'></i></a></span>
                            <span v-if='$store.state.isLogin' @click=''>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                            <span>&nbsp; &nbsp;&nbsp;<Share-View :id='article._id'></Share-View></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class='panel panel-info' v-if='data.currentArticles.length == 0'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)'> 404 !!!!!</a>
                    </div>
                    <div class='article-content'>
                        这个分类还没有内容哦！
                    </div>
                </div>
            </div>

            <div>
                <ul class="pagination" style='margin:0 auto;'>
                    <li v-if='data.hasFst' @click='toFirst'><a href="javascript:void(0)" class='fa fa-angle-double-left'></a></li>
                    <li v-if='data.hasLast' @click='lastPage'><a href="javascript:void(0)" class='fa fa-angle-left'></a></li>
                    <li><span href="javascript:void(0)">第{{pg}}页</span></li>
                    <li v-if='data.hasNxt' @click='nxtPage'><a href="javascript:void(0)" class='fa fa-angle-right'></a></li>
                    <li v-if='data.hasLst' @click='toLast'><a href="javascript:void(0)" class='fa fa-angle-double-right'></a></li>
                </ul>
                <div class='pull-right'>
                    <button class='btn btn-default' style='border-color:#6FBADE;color:#6FBADE' @click='toTop'><i class='fa fa-arrow-up'></i></button>
                </div>
            </div>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

    import ConfirmView from "~components/minorcomponents/confirmview.vue";
    import ShareView from "~components/minorcomponents/sharearticle.vue";

    export default {
        props:[
            "data","pg","title"
        ],
        methods:{
            articleDetail(article){
                this.$store.commit('loadArticleDetail',article);
                this.$router.push({path:`/articles/${article._id}`,params:article});
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
            modify(article){
                this.$store.commit('loadArticleDetail',article);
                this.$router.push({path:`/articles/${article._id}`,query:{isediting:true}})
            },
            deleteArticle(id){
                this.$refs.confirmView.getAction("是否删除该文章?",() => {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: function(result) {
                            location.reload();
                        },
                        error:result => {
                            alert(result.responseJSON.content);
                        }
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            toFirst(){
                window.scrollTo(0,0);
                this.$emit('switch',1);
            },
            lastPage(){
                window.scrollTo(0,0);
                const newPg = Number(this.pg) - 1;
                this.$emit('switch',newPg);                
            },
            nxtPage(){
                window.scrollTo(0,0);
                const newPg = Number(this.pg) + 1;
                this.$emit('switch',newPg);
            },
            toLast(){
                window.scrollTo(0,0);
                this.$emit('switch',this.data.lastPg);
            },
            toTop(){
                window.scrollTo(0,0);
            }
        },
        components:{
            ConfirmView,
            ShareView
        }
    }    
</script>