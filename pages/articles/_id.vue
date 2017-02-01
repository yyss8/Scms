<template>
    <div class='panel panel-default blog-newContent'>
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
                            <span><i class='fa fa-calendar'></i>&nbsp; <a href='javascript:void(0)'>{{ showDate(article._id) }}</a></span><br />
                            <span><i class='fa fa-clock-o'></i>&nbsp;{{ showTime(article._id) }}</span>
                        </div>
                        <div class='article-content' v-html='toHtml(article.content)'></div>
                    </div>
                    <div class='article-content' v-if='isEditing' style='padding:0'>
                        <Edit-Post currentArticle='$store.state.currentArticle'></Edit-Post>
                    </div><br />
                    <div class='article-btns'>
                        <div class='article-btns-right pull-right'>
                            <a><i class='fa fa-share' @click='shareArticle'></i></a>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='修改文章'><i class='fa fa-edit' @click='modify'></i></a></span>
                            <span v-if='$store.state.isLogin' @click=''>&nbsp; &nbsp;&nbsp;<a title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import EditPost from "../../components/minorcomponents/posteditor.vue";

    export default {
        data({store,route,req,redirect}){
            if (req !== undefined){
                if (req.article._id !== undefined){
                    store.commit('loadArticleDetail',req.article);
                    return {
                        article:req.article,
                        isEditing:route.query.isediting === undefined ? false:true
                    }
                }else{
                    redirect('/');
                }
            }else{
                return {
                    article:store.state.currentArticle,
                    isEditing:route.query.isediting === undefined ? false:true
                }
            }

            return {
                article:{},
                isEditing:false
            }

        },
        methods:{
            toHtml(content){
                const patternObj = {
                    code:{
                        reg:/\[code\](.*?)\[\/code]/g
                    },
                    br:{
                        reg:/(?:\r\n|\r|\n)/g,
                        newStr:"<br />"
                    },
                    b:{
                        reg:/\[b\](.*?)\[\/b\]/g,
                        newStr:"<b>$1</b>"
                    },
                    img:{
                        reg:/\[img(.*?)](.*?)\[\/img\]/g
                    },
                    color:{
                        reg:/\[c='(.*?)'\](.*?)\[\/c\]/g,
                        newStr:"<span style='color:$1'>$2</span>"
                    },
                    size:{
                        reg:/\[s='(.*?)'\](.*?)\[\/s\]/g,
                        newStr:"<span style='font-size:$1'>$2</span>",
                    },
                    i:{
                        reg:/\[i\](.*?)\[\/i\]/g,
                        newStr:"<i>$1</i>"
                    },
                    quote:{
                        reg:/\[quote](.*?)\[\/quote]/g,
                        newStr:"<blockquote>$1</blockquote>"
                    },
                    u:{
                        reg:/\[u\](.*?)\[\/u\]/g,
                        newStr:"<u>$1</u>"
                    }
                };

                let newContent = content;

                for (let pat in patternObj){
                    switch (pat){
                        case "code":
                            const codeTags = newContent.match(patternObj[pat].reg);
                            if (codeTags !== null){
                                codeTags.forEach(code => {
                                    let convertedTag = code.replace(patternObj[pat].reg,"$1");
                                    convertedTag = convertedTag.replace(/\</g,"&lt;");
                                    convertedTag = convertedTag.replace(/\>/g,"&gt;");
                                    newContent = newContent.replace(/\[code](.*?)\[\/code\]/, `<blockquote class='pre-scrollable'>${convertedTag}</blockquote>`);
                                });
                            }
                            break;
                        case "img":
                            const imgTags = newContent.match(patternObj[pat].reg);
                            if (imgTags !== null){
                                newContent.match(patternObj[pat].reg).forEach(img =>{
                                    let attrib = (img.match(/\[img(.*?)]/))[1];
                                    let url = (img.match(/\](.*?)\[\//))[1];
                                    let alt = attrib.match(/a=\'(.*?)\'/) === null ? "":` alt='${(attrib.match(/a=\'(.*?)\'/))[1]}'`; //更换alt标签
                                    let w = attrib.match(/w=\'(.*?)\'/) === null ? "":` width='${(attrib.match(/w=\'(.*?)\'/))[1]}'`; //更换width标签
                                    let h = attrib.match(/h=\'(.*?)\'/) === null ? "":` height='${(attrib.match(/h=\'(.*?)\'/))[1]}'`; //更换height标签
                                    let imgTag = `<img${alt}${w}${h} src='${url}' />`;
                                    newContent = newContent.replace(/\[img.*?].*?\[\/img\]/,imgTag);
                                });
                            }
                            break;
                        case "url":
                            break;
                        default:
                            newContent = newContent.replace(patternObj[pat].reg,patternObj[pat].newStr);
                    }
                }

                return newContent
            },
            showDate(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();

                return [year,month,day].join('/')
            },
            showTime(id){
                console.log
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                
                return [date.getHours(),date.getMinutes(),date.getSeconds()].join(":")
            },
            shareArticle(){

            },
            deleteArticle(id){

            },
            modify(){
                this.isEditing = !this.isEditing;
            }
        },
        components:{
            EditPost
        }
    }
</script>