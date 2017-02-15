<template>
    <div>
        <br />
        <div class='container-fluid'>
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowReg' />开启用户注册
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            如果关闭用户注册将会在用户评论时允许用户自定义名称.
                            </span>
                        </div>
                    </span>
                </label>
            </div><br />
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowNonUserViewArticle' />允许非用户浏览文章
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            用户需要注册才能浏览博客文章.
                            </span>
                        </div>
                    </span>
                </label>
            </div><br />
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowNonUserComment' />允许非用户评论
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            非用户评论时都讲显示为游客.
                            </span>
                        </div>
                    </span>
                </label>
            </div>
        </div>
        <br /><br />
        <div class='admin-control-buttons'>
            <br />
            <div style='width:25%;'>
                <Result-View ref='resultView'></Result-View>    
            </div><br />
            <button class='btn btn-default' @click='save'>保存</button>
        </div>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data({store}){
            return {
                allowReg:store.state.usersControl.allowReg,
                allowNonUserViewArticle : store.state.usersControl.allowNonUserViewArticle,
                allowNonUserComment : store.state.usersControl.allowNonUserComment
            }
        },
        methods:{
            save(){
                const data = {
                    allowReg:this.allowReg,
                    allowNonUserViewArticle:this.allowNonUserViewArticle,
                    allowNonUserComment:this.allowNonUserComment
                }

                $.ajax({
                    url: `/admin/users/gs`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        this.$store.commit('updateUsersControl',data);
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        components:{
            ResultView
        }
    }
</script>