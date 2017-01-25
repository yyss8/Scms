<template>
    <div class='headerview'>
        <div class='row headerBtns'>
            <div class='col-md-12'>
                <a class="navbar-text header-logo" style='color:white;' href='/'><img src='/images/logo.png'></a>
                <ul class="nav">
                    <div class="dropdown">
                        <button class="navbtn"><i class='fa fa-list'></i> &nbsp; <strong style='position: relative;top:-2px'>文章类别</strong></button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <button class='navbtn' onclick="window.location='http://github.com/yyss8';"><i class='fa fa-github'></i> &nbsp; <strong style='position: relative;top:-2px'>作品地址</strong></button>
                    <button class='navbtn'><strong style='position: relative;top:-2px'>关于本站</strong></button>
                    <div class="navbar-right" style='margin-top:8px;'>
                        <transition name="searchBarAnimate">
                            <input class='searchInput form-control-static' placeholder="搜索" v-if='showSearch' />
                        </transition>
                        <button class='navbtn' @click='search' style='padding:8px 16px 8px 16px;'><i class='fa fa-search'></i></button>
                        <button class='navbtn' style='padding:8px 16px 8px 16px;'  data-toggle="modal" data-target="#settingField"><i class='fa fa-gear'></i></button>
                    </div>
                </ul>
            </div>
            <div class="modal fade" id="settingField" tabindex="-1" role="dialog" aria-labelledby="settingFieldLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <br /><br /><br /><br />
                        <Login-View v-if='!isLogin'></Login-View>
                        <Quick-Setting v-if='isLogin'></Quick-Setting>
                        <br /><br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import LoginView from "./minorcomponents/loginview.vue";
    import QuickSetting from "./minorcomponents/headersetting.vue";
    import store from "../store/index";

    export default {
        data(){
            return {
                showSearch:false,
                searchKeyWrds:""
            }
        },
        store,
        computed:{
            isLogin(){
                return store.state.isLogin
            }
        },
        methods:{
            search(){
                if (!this.showSearch){
                    this.showSearch = true;
                }else if (this.searchKeyWrds === "" && this.showSearch){
                    this.showSearch = false;
                }
            }
        },
        components:{
            LoginView,
            QuickSetting
        }
    }
</script>

<style>

    .headerview{
        position: relative;
        margin:0 auto;
        width:70%;
    }

    .header-logo{
        color:white;
        margin-top:-9px;
        text-align: center;
    }

    .header-logo img{

        width:90px;
    }

    .searchInput{
        border-radius: 5px;
        position: relative;
        top:1px;
        font-size: 18px;
        padding-left: 8px;
    }

    .navbtn {
        background-color: #6FBADE;
        color: white;
        padding: 16px;
        font-size: 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.5s;
        vertical-align: middle;
    }

    .navbtn:hover {
        background-color: #C1D5E5;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        z-index:3;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        transition: opacity 0.5s;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {background-color: #f1f1f1}

    /* hover触发dropdown内容显示动画 */
    .dropdown:hover .dropdown-content {
        opacity: 1;
        pointer-events: auto;
    }

    .searchBarAnimate-enter-active{
        transition: all .3s ease;
    }

    .searchBarAnimate-leave-active {
        transition: all .3s ease;
    }
    .searchBarAnimate-enter, .searchBarAnimate-leave-to{
        transform: translateX(30px);
        opacity: 0;
    }

    .modal-dialog{
        top:15vh;
    }

    @media only screen and (max-width: 991px){
        .headerBtns{
            text-align: center;
        }

        .searchInput{
            top:0px;
        }
    }
</style>