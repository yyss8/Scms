<template>
    <div class='row'>
        <br /><br /><br /><br />
        <div class="loginview">
            <form id="login">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw" aria-hidden="true"></i></span>
                        <input type="text" v-model="username" placeholder="用户名" required class="form-control mainInput" v-on:keyup.enter='loginBnt' data-minlength="2">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                        <input type="password" v-model='password' placeholder="密码" required class="form-control mainInput" v-on:keyup.enter='loginBnt' data-minlength="6">
                    </div>
                </div>
                <button @click="login" type="button" class="btn login-btn">登录</button>
            </form>
            <br><b style='color:white'>Demo Account: ID:1 Pw:1</b>
            <p class="alert alert-danger" v-if='hasError' role="alert">
                <i class="fa  fa-exclamation fa-fw" aria-hidden="true" :class="{hidden:resultAlert}"></i>
            {{ result }}</p>
            <p class="alert alert-success" v-if='hasMsg' role="alert">
                <i class="fa  fa-check fa-fw" aria-hidden="true"></i>
            {{ result }}</p>
        </div>
        <br /><br />
    </div>
</template>

<script>

    export default {
        data(){
            return {
                username:"",
                password:"",
                result:"",
                hasError:false,
                hasMsg:false,
            }
        },
        methods:{
            login(){
                if (this.username == ""){
                    this.hasError = true;
                    this.result = "Enter Password";
                }else if (this.password == ""){
                    this.hasError = true;
                    this.result = "Enter Username";
                }else{
                    this.hasError = false;
                    this.result = "";
                    const loginData = {
                        username:this.username,
                        password:this.password
                    };
                    $.ajax({
                        url: `/user/login`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(loginData),
                        success: (result)=>{
                            $("#settingField").modal("hide");
                            this.$store.commit('login',result.result);
                        },
                        error:err =>{
                            this.hasError = true;
                            this.result = err.responseJSON.content;                           
                        }
                    });
                }
            }
        }
    }
</script>
