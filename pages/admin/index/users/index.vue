<template>
    <div class='admin-users-general'>
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
                    </span>&nbsp;&nbsp;
                </label>
                <button type="button" class="close" v-if='allowReg && !showRegSettings' @click='showRegSettings = !showRegSettings'>
                    <i class='fa fa-gear'></i>
                </button>
            </div><br />
            <div class='admin-reg-settings' v-if='showRegSettings'>
                <div class='container-fluid'>
                    <div class='panel panel-info'>
                        <div class="panel-heading">用户注册设置
                            <button type="button" class="close" @click='showRegSettings = !showRegSettings'>
                                <i class='fa fa-chevron-up'></i>
                            </button>
                        </div>
                        <div class='panel-body'>
                            <div class='form-group'>
                                <label>IP每天可注册用户数:</label>
                                <input type='number' class='form-control' v-model='serverUsersControl.regPerDay'/> 
                            </div>
                            <div class='form-group'>
                                <label>禁止以下IP注册 (每行一个IP地址):</label>
                                <textarea class='form-control' v-model='serverUsersControl.disallowedIP' rows='4'></textarea>
                            </div>
                            <div class='form-group'>
                                <label>禁止以下用户名 (用","逗号隔离每一个关键词):</label>
                                <textarea class='form-control' v-model='serverUsersControl.disallowedIP' rows='2'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

    import ResultView from "~/components/minorcomponents/resultview.vue";

    export default {
        data(){

            const { usersControl } = this.$store.state;
            return {
                allowReg:usersControl.allowReg,
                showRegSettings:usersControl.allowReg ? true:false,
                allowNonUserViewArticle : usersControl.allowNonUserViewArticle,
                allowNonUserComment : usersControl.allowNonUserComment,
                serverUsersControl:{
                    regPerDay:1,
                    disallowedIP:""
                }
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