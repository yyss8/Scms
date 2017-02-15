<template>
    <div class='container-fluid'>
        <div class='admin-user-search-field'>
            <div class='row'>
                <div class='col-sm-3'>
                    <div class='input-group'>
                        <input class='form-control' placeholder="搜索用户名或邮箱" v-model='userKyWrds'/>
                        <div class="input-group-btn">
                            <button class="btn btn-default" v-if='userKyWrds != ""' type="button" @click='clearResult'><i class="fa fa-times"></i></button>
                            <button class="btn btn-default" type="button" @click='search'><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                    <ul class='nav nav-second-level user-search-result' v-if='users.length != 0'>
                        <a v-for="user in users" class='list-group-item list-group-item-action' @click="select(user)" href='javascript:void(0)'>
                            {{ user.username }}
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        <nuxt-child></nuxt-child>
    </div>
    
</template>

<script>

    export default {
        data(){
            return {
                userKyWrds:"",
                users:[]
            }
        },
        methods:{
            search(){
                if (this.userKyWrds == ""){
                    this.users.push({username:"请输入关键词",_id:"err"});
                }else{
                    $.ajax({
                        url: `/user/matched/${this.userKyWrds}`,
                        type:"GET",
                        success: res => {
                            this.users.length = 0;
                            if (res.result.length == 0 ){
                                this.users.push({username:"无匹配用户",_id:"err"});
                            }else{
                                this.users = res.result;
                            }
                        },
                        error: err => {
                            this.users.push({username:"出现错误",_id:"err"});
                        }
                    });
                }
            },
            clearResult(){
                this.userKyWrds = "";
                this.users.length = 0;
            },
            select(user){
                if (user._id != "err"){
                    this.users.length = 0;
                    this.$router.push({path:`/admin/users/profile/id/${user._id}`});
                }
            }
        }
    }
</script>

<style>
    .user-search-result{
        max-height:200px;
        overflow-y:auto;
    }

    .user-search-result::-webkit-scrollbar {
        width: 6px;
    }
    
    .user-search-result::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        border-radius: 6px;
    }
    
    .user-search-result::-webkit-scrollbar-thumb {
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
</style>