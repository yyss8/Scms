<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info article-body' v-for='article in $store.state.articles'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <nuxt-link :to="{path:`/articles/${article._id}`}">
                            {{ shortTitle(article.title) }}
                        </nuxt-link>
                    </div>
                    <div class='article-content' v-html='shortArticle(article.content,article._id)'>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)' :title='showTime(article._id)' @click='toDate(article._id)'>{{ showDate(article._id) }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)' @click='toCategories(article.category)'>{{ article.category }}</a></span>
                        <div class='article-btns-right pull-right'>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='修改文章'><i class='fa fa-edit' @click='modify(article)'></i></a></span>
                            <span v-if='$store.state.isLogin' @click=''>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                            <Share-View :id='article._id'></Share-View>
                        </div>
                    </div>
                </div>
            </div>
            <Switch-Page v-if='$store.state.articleNum>5'></Switch-Page>
        </div>

        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

    import ShareView from "~components/minorcomponents/sharearticle.vue";
    import SwitchPage from "~components/articlelist/switchpage.vue";
    import ResultView from "~components/minorcomponents/resultview.vue";
    import ConfirmView from "~components/minorcomponents/confirmview.vue";

    export default {
        props:["pg"],
        data(){
            return{

            }
        },
        methods:{
            articleDetail(article){
                this.$router.push({path:`/articles/${article._id}`});
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
                    url:{
                        reg:/\[url.*?].*?\[\/url\]/g
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

                let newContent = content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
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
                        case "url":
                            const tags = newContent.match(patternObj[pat].reg);
                            if (tags !== null){
                                tags.forEach(url => {
                                    const attributes = (url.match(/\[url(.*?)]/))[1];
                                    const alt = (url.match(/\](.*?)\[\//))[1] === "" ? `${(attributes.match(/a=\'(.*?)\'/))[1]}`:(url.match(/\](.*?)\[\//))[1];
                                    const link = `href='${attributes.match(/a=\'(.*?)\'/)[1]}'`;
                                    const urlTag = `<a ${link}>${alt}</a>`;
                                    endNum += urlTag.length;
                                    newContent = newContent.replace(/\[url.*?].*?\[\/url\]/,urlTag);
                                });
                                
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
                const hour = date.getHours().toString().length == 1 ? "0" + date.getHours():date.getHours().toString();
                const min = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes():date.getMinutes().toString();
                const sec = date.getSeconds().toString().length == 1 ? "0" + date.getSeconds():date.getSeconds().toString();

                return [hour,min,sec].join(":")
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

<style>


</style>