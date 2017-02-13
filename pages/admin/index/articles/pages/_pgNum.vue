<template>
    <div>
        <table class="table table-striped"> 
            <thead>
                <tr>
                    <th>文章标题</th>
                    <th>文章日期</th>
                    <th>文章分类</th>
                    <th class='text-center'>点击数</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='(article,index) in articles.currentArticles'>
                    <th><a href='javascript:void(0)' @click='modify(article._id)'>{{shortTitle(article.title)}}</a></th>
                    <th>{{showDate(article._id)}}</th>
                    <th>{{article.category}}</th>
                    <th class='text-center'>{{article.click}}</th>
                    <th class='text-center'><a href='javascript:void(0)'  @click='modify(index)'>编辑</a></th>
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
                <Edit-Post :preLoads='editLoads'>
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
                    }
                }
            }else{
                const {result} = await $.get(`/admin/articles/pages/${route.params.pgNum}/client`);
                return {
                    articles:result,
                    editLoads:{
                        hasCategory:true,
                        categoryList:store.state.postCategories
                    },
                    modifyingArticle:{}
                }
            }
        },
        created(){
            this.editLoads.submit = this.save;
            this.editLoads.cancel = this.cancel;
        },
        methods:{
            shortTitle(title){
                if (title.length > 20){
                    return title.substring(0,20) + " ...."
                }
                return title
            },
            showDate(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();
                const d = [year,month,day].join('/');

                const hour = date.getHours().toString().length == 1 ? "0" + date.getHours():date.getHours().toString();
                const min = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes():date.getMinutes().toString();
                const sec = date.getSeconds().toString().length == 1 ? "0" + date.getSeconds():date.getSeconds().toString();
                const time = [date.getHours(),date.getMinutes(),date.getSeconds()].join(":");
                
                return `${d} | ${time}`
            },
            modify(index){
                this.$refs.modalView.toggle();
                this.editLoads.article = this.articles.currentArticles[index];
                this.modifyingArticle = {
                    id:this.articles.currentArticles[index]._id,
                    allowComments:this.articles.currentArticles[index].allowComments,
                    allowSubComments:this.articles.currentArticles[index].allowSubComments
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
                const id = this.articles.currentArticles[index]._id;
                this.$refs.confirmView.getAction("是否删除该文章?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                        }               
                    });
                });
                $("#confirmMsg").modal('toggle');
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