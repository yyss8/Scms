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
                            <span><i class='fa fa-calendar'></i>&nbsp; <a href='javascript:void(0)'>{{ showDate(article._id) }}</a></span><br />
                            <span><i class='fa fa-clock-o'></i>&nbsp;{{ showTime(article._id) }}</span>
                        </div>
                        <div class='article-content' v-html='toHtml(article.content)'></div>
                    </div>
                    <div class='article-content' v-if='isEditing' style='padding:0'>
                        <Edit-Post :preLoads='editLoads'></Edit-Post>
                    </div><br />
                    <div class='article-btns'>
                        <div class='article-btns-right pull-right'>
                            <a title='分享文章'><i class='fa fa-share' @click='shareArticle'></i></a>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='修改文章'><i class='fa fa-edit' @click='editorModifty'></i></a></span>
                            <span v-if='$store.state.isLogin'>&nbsp; &nbsp;&nbsp;<a title='删除文章'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                        </div>
                    </div><br />
                    <Comments :comments='article.comments'></Comments>
                    <br />
                    <div class='article-lastandnext'>
                        <span>&nbsp;
                            <nuxt-link v-if='lastArticle != "No Result"' :to="{path:`/articles/${lastArticle._id}`}" active-class='admin-sidebar-active'><i class='fa fa-chevron-left'></i>&nbsp; {{shortTitle(lastArticle.title)}}</nuxt-link>
                        </span>
                        <span>
                            <nuxt-link :to="{path:`/articles/${nextArticle._id}`}" active-class='admin-sidebar-active' v-if='nextArticle != "No Result"' class='pull-right'>
                                {{shortTitle(nextArticle.title)}}&nbsp;
                                <i class='fa fa-chevron-right'></i>
                            </nuxt-link>
                        </span>
                    </div>
                </div>
            </div>
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
    import Comments from "~components/minorcomponents/comments.vue";
    import EditPost from "~components/minorcomponents/posteditor.vue";

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
                            },
                            confirmTxt:"",
                            confirmTitle:"",
                            pendingAction:{},
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
                    },
                    confirmTxt:"",
                    confirmTitle:"",
                    pendingAction:{},
                }
            }

        },
        methods:{
            shortTitle(title){
                if (title.length > 10){
                    return title.substring(0,10) + " ...."
                }
                return title
            },
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
                    url:{
                        reg:/\[url.*?].*?\[\/url\]/g
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

                let newContent = content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");

                for (let pat in patternObj){
                    let tags
                    switch (pat){
                        case "code":
                            tags = newContent.match(patternObj[pat].reg);
                            if (tags !== null){
                                tags.forEach(code => {
                                    let convertedTag = code.replace(patternObj[pat].reg,"$1");
                                    convertedTag = convertedTag.replace(/\</g,"&lt;");
                                    convertedTag = convertedTag.replace(/\>/g,"&gt;");
                                    newContent = newContent.replace(/\[code](.*?)\[\/code\]/, `<blockquote class='pre-scrollable'>${convertedTag}</blockquote>`);
                                });
                            }
                            break;
                        case "img":
                            tags = newContent.match(patternObj[pat].reg);
                            if (tags !== null){
                                tags.forEach(img =>{
                                    const attributes = (img.match(/\[img(.*?)]/))[1];
                                    const url = (img.match(/\](.*?)\[\//))[1];
                                    const alt = attributes.match(/a=\'(.*?)\'/) === null ? "":` alt='${(attributes.match(/a=\'(.*?)\'/))[1]}'`; //更换alt标签
                                    const w = attributes.match(/w=\'(.*?)\'/) === null ? "":` width='${(attributes.match(/w=\'(.*?)\'/))[1]}'`; //更换width标签
                                    const h = attributes.match(/h=\'(.*?)\'/) === null ? "":` height='${(attributes.match(/h=\'(.*?)\'/))[1]}'`; //更换height标签
                                    const imgTag = `<img${alt}${w}${h} src='${url}' />`;
                                    newContent = newContent.replace(/\[img.*?].*?\[\/img\]/,imgTag);
                                });
                            }
                            break;
                        case "url":
                            tags = newContent.match(patternObj[pat].reg);
                            if (tags !== null){
                                tags.forEach(url => {
                                    const attributes = (url.match(/\[url(.*?)]/))[1];
                                    const alt = (url.match(/\](.*?)\[\//))[1] === "" ? `${(attributes.match(/a=\'(.*?)\'/))[1]}`:(url.match(/\](.*?)\[\//))[1];
                                    const link = `href='${attributes.match(/a=\'(.*?)\'/)[1]}'`;
                                    const urlTag = `<a ${link}>${alt}</a>`;
                                    newContent = newContent.replace(/\[url.*?].*?\[\/url\]/,urlTag);
                                });
                            }
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
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                
                return [date.getHours(),date.getMinutes(),date.getSeconds()].join(":")
            },
            shareArticle(){

            },
            deleteArticle(id){

            },
            editorModifty(){
                this.isEditing = !this.isEditing;
            },
            editorSubmit(data,onResult) {
                const postData = data;
                postData.id = this.article._id;

                $.ajax({
                    url: `/post/`,
                    type:'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        if (result.status == "ok"){
                            onResult(result.content,"success");
                            location.href = this.$route.path;
                        }else{
                            onResult(result.content,"error");
                        }
                    }
                });
            },
            sendAction(){
                $.ajax(this.pendingAction);
            }

        },
        components:{
            Comments,
            EditPost
        }
    }
</script>