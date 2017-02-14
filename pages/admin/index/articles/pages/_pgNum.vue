<template>
    <div>
        <table class="table table-striped"> 
            <thead>
                <tr>
                    <th>文章标题</th>
                    <th>文章日期</th>
                    <th>文章分类</th>
                    <th class='text-center'>点击数</th>
                    <th class='text-center'>评论数</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='(article,index) in articles.currentArticles'>
                    <th><a href='javascript:void(0)' @click='modify(index)'>{{$scms.showShortTitle(article.title,20)}}</a></th>
                    <th>{{$scms.showDate(article._id)}} | {{$scms.showTime(article._id)}}</th>
                    <th>{{article.category}}</th>
                    <th class='text-center'>{{article.click}}</th>
                    <th class='text-center'><a href='javascript:void(0)' @click='modify(index,"comments")'>{{ $scms.showCommentNumber(article.comments) }}</a></th>
                    <th class='text-center'><a href='javascript:void(0)'  @click='modify(index,"article")'>编辑</a></th>
                    <th class='text-center'><a href='javascript:void(0)'  @click='deleteArticle(index)'>删除</a></th>
                </tr>
            </tbody>
        </table>
        <div>
            <ul class="pagination" style='margin:0 auto;'>
                <li v-if='articles.hasFst' @click='toFirst'><a href="javascript:void(0)" class='fa fa-angle-double-left'></a></li>
                <li v-if='articles.hasLast' @click='lastPage'><a href="javascript:void(0)" class='fa fa-angle-left'></a></li>
                <li><span href="javascript:void(0)" style='color:#6FBADE;'>第{{$route.params.pgNum}}页</span></li>
                <li v-if='articles.hasNxt' @click='nxtPage'><a href="javascript:void(0)" class='fa fa-angle-right'></a></li>
                <li v-if='articles.hasLst' @click='toLast'><a href="javascript:void(0)" class='fa fa-angle-double-right'></a></li>
            </ul>
        </div><br />
        <Modal-View ref='modalView'>
            <div class='scms-modal-body'>
                <ul class="nav nav-tabs">
                    <li :class='{active:showArticle}'>
                        <a href='javascript:void(0)' @click='enableArticle'>文章内容</a>
                    </li>
                    <li :class='{active:showComments}'>
                        <a href='javascript:void(0)' @click='enableComments' v-if='this.editLoads.article !== undefined'>评论</a>
                    </li>
                </ul>
                <Edit-Post :preLoads='editLoads' v-if='showArticle'>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" v-model='modifyingArticle.allowComments'/>允许评论
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            <input type="checkbox" v-model='modifyingArticle.allowSubComments'/>允许子评论
                        </label>
                    </div>
                </Edit-Post>
                <div v-if='showComments'>
                    <div class='container-fluid'>
                        <table class='table table-striped'>
                            <thead>
                                <tr>
                                    <th>标题</th>
                                    <th class='text-center'>内容</th>
                                    <th class='text-center'>点赞数</th>
                                    <th class='text-center'>子评论</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='(comment,index) in modifyingArticleComments.comments'>
                                    <th>{{ $scms.showShortTitle(comment.title,5) }}</th>
                                    <th class='text-center'>
                                        <div class="dropdown">
                                            <a href='javascript:void(0)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class='fa fa-info-circle'></i></a>
                                            <div class='dropdown-menu'>
                                                <div class='container-fluid'>
                                                    <div v-html='$scms.toFullHtml(comment.content)'></div>
                                                </div>
                                            </div>
                                        </div>     
                                    </th>
                                    <th class='text-center'>{{ comment.like.num }}</th>
                                    <th class='text-center'>
                                        <div class="dropdown">
                                            <a href='javascript:void(0)' @click='openSub(index)'>{{ Object.keys(comment.comments).length }}</a>
                                            <div class='dropdown-menu' style='width:400px;' :id='"comment" + index.toString()'>
                                                <div class="modal-header">
                                                    <span>子评论</span>
                                                    <button type="button" class="close" @click='closeSub(index)'>
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <table class='table table-striped'>
                                                        <thead>
                                                            <tr>
                                                                <th class='text-center'>内容</th>
                                                                <th class='text-center'>点赞数</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for='(sub,subid) in comment.comments'>
                                                                <th class='text-center'>
                                                                    <div class="dropdown">
                                                                        <a href='javascript:void(0)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class='fa fa-info-circle'></i></a>
                                                                        <div class='dropdown-menu'>
                                                                            <div class='container-fluid'>
                                                                                <div v-html='$scms.toFullHtml(sub.content)'></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>     
                                                                </th>
                                                                <th class='text-center'>{{ sub.like.num }}</th>
                                                                <th class='text-center'><a href='javascript:void(0)' @click='deleteSubComment(comment._id,subid)'>删除</a></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary" @click='closeSub(index)'>确定</button>
                                                </div>
                                            </div>
                                        </div> 
                                        
                                    </th>
                                    <th class='text-center'><a href='javascript:void(0)' @click='deleteComment(comment._id)'>删除</a></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Modal-View>
        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' @click='add'>添加文章</button>&nbsp;&nbsp;
            </span>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>


<script>

    import ModalView from "~components/minorcomponents/scmsmodal.vue";
    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ResultView from "~components/minorcomponents/resultview.vue";
    import ConfirmView from "~components/minorcomponents/confirmview.vue";

    export default {
        async data({req,route,store}){
            if (req){
                return {
                    articles:req.preLoad.articles,
                    editLoads:{
                        hasCategory:true,
                        categoryList:store.state.postCategories
                    },
                    modifyingArticle:{
                        allowComments:true,
                        allowSubComments:true
                    },
                    modifyingArticleComments:{
                        comments:[]
                    },
                    showArticle:true,
                    showComments:false
                }
            }else{
                const {result} = await $.get(`/admin/articles/pages/${route.params.pgNum}/client`);
                return {
                    articles:result,
                    editLoads:{
                        hasCategory:true,
                        categoryList:store.state.postCategories
                    },
                    modifyingArticle:{},
                    modifyingArticleComments:{
                        comments:[]
                    },
                    showArticle:true,
                    showComments:false
                }
            }
        },
        created(){
            this.editLoads.submit = this.save;
            this.editLoads.cancel = this.cancel;
        },
        methods:{
            enableArticle(){
                this.showArticle = true;
                this.showComments = false;
            },
            enableComments(index){
                this.modifyingArticleComments = {
                    comments:this.editLoads.article.comments
                };
                this.showArticle = false;
                this.showComments = true;                
            },
            modify(index,modifyType){
                this.$refs.modalView.toggle();
                this.editLoads.article = this.articles.currentArticles[index];
                if (modifyType == "comments"){
                    this.showArticle = false;
                    this.showComments = true;
                    this.modifyingArticleComments = {
                        comments:this.articles.currentArticles[index].comments
                    }
                }else{
                    //修改文章内容
                    this.showArticle = true;
                    this.modifyingArticle = {
                        id:this.articles.currentArticles[index]._id,
                        allowComments:this.articles.currentArticles[index].allowComments,
                        allowSubComments:this.articles.currentArticles[index].allowSubComments
                    }
                }
            },
            cancel(){
                this.$refs.modalView.toggle();
            },
            add(){
                this.editLoads = {
                    hasCategory:true,
                    categoryList:this.$store.state.postCategories,
                    submit:this.addArticle,
                    cancel:this.cancel
                }
                this.modifyingArticle = {
                    allowComments:true,
                    allowSubComments:true
                }
                this.showArticle = true;
                this.showComments = false;
                this.$refs.modalView.toggle();

            },
            addArticle(data,onResult){
                const postData = Object.assign(data,this.modifyingArticle);

                $.ajax({
                    url: `/post/`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        location.reload();
                    },
                    error: err => {
                        this.$refs.modalView.toggle();
                        this.$refs.resultView.sendMsg(result.content,"error");                        
                    }
                });
            },
            save(data) {

                const postData = Object.assign(data,this.modifyingArticle);

                $.ajax({
                    url: `/post/`,
                    type:'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        this.$refs.modalView.toggle();
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(result.content,"error");
                    }
                });
            },  
            deleteArticle(index){
                const sendMsg = this.$refs.resultView.sendMsg;
                const id = this.articles.currentArticles[index]._id;
                this.$refs.confirmView.getAction("是否删除该文章?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }               
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            deleteComment(id){
                const sendMsg = this.$refs.resultView.sendMsg;
                const _id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("是否删除该评论？",function() {
                    $.ajax({
                        url: `/post/${_id}/comments/${id}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }      
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            deleteSubComment(id,subid){
                const sendMsg = this.$refs.resultView.sendMsg;
                const _id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("是否删除子评论？",function() {
                    $.ajax({
                        url: `/post/${_id}/comments/${id}/subcomments/${subid}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            openSub(index){
                $(`#comment${index}`).show();
            },
            closeSub(index){
                $(`#comment${index}`).hide();
            }
        },
        components:{
            ModalView,
            EditPost,
            ResultView,
            ConfirmView
        }
    }
</script>