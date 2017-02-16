<template>
    <div class='row'>
        <br /><br /><br />
        <div class="loginview">
            <div class='radio'>
                <label><input type='radio' v-model='selectedForm' value='login'/>登录</label>&nbsp;
                <label><input type='radio' v-model='selectedForm' value='signup'>注册</label>
            </div>
            <form id="login">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw" aria-hidden="true"></i></span>
                        <input type="text" v-model="username" placeholder="用户名" required class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                        <input type="password" v-model='password' placeholder="密码" required class="form-control">
                    </div>
                </div>
                <div class="form-group" v-if='selectedForm == "signup"'>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></span>
                        <input type="email" v-model='email' placeholder="邮箱" required class="form-control">
                    </div>
                </div>
                <button @click="selectedForm == 'login' ? login():signup()" type="button" class="btn login-btn">{{ selectedForm == "login" ? '登录':'注册'}}</button>
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
                email:"",
                result:"",
                hasError:false,
                hasMsg:false,
                selectedForm:"login"
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
                        success: result => {
                            $("#settingField").modal("toggle");
                            this.$store.commit('login',result.result);
                        },
                        error:err => {
                            this.hasError = true;
                            this.result = err.responseJSON.content;                           
                        }
                    });
                }
            },
            signup(){
                if (this.username == ""){
                    this.hasError = true;
                    this.result = "请输入帐号0";
                }else if (this.password == ""){
                    this.hasError = true;
                    this.result = "请输入密码";
                }else if (this.email == ""){
                    this.hasError = true;
                    this.result = "请输入邮箱";
                }else{
                    this.hasError = false;
                    this.result = "";
                    const data = {
                        username:this.username,
                        password:this.password,
                        email:this.email,
                        usertype:2
                    };
                    $.ajax({
                        url: `/user/signup`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: result => {
                            $("#settingField").modal("toggle");
                            this.$store.commit('login',data);
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
