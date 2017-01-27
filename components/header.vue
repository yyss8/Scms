<template>
    <div class='headerview'>
        <div class='row headerBtns'>
            <div class='col-md-12'>
                <a class="navbar-text header-logo" style='color:white;' href='/'><img src='/images/logo.png'></a>
                <ul class="nav">
                    <span v-for='link in headerLink' :class={dropdown:link.hasSub}>
                        <button class="navbtn" :onclick='urlClick(link.url)'><i v-if='link.icon !== ""' class='fa' :class='link.icon'>&nbsp;&nbsp;&nbsp;</i><strong style='position: relative;top:-2px'>{{link.name}}</strong></button>
                        <div class="dropdown-content" v-if='link.hasSub'>
                            <a v-for='sub in link.subLinks' :href='sub.url !== "" ? sub.url:"javascript:void(0)"'>{{sub.name}}</a>
                        </div>
                    </span>
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

    export default {
        data(){
            return {
                showSearch:false,
                searchKeyWrds:""
            }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            },
            headerLink(){
                return this.$store.state.headerLink
            }
        },
        methods:{
            search(){
                if (!this.showSearch){
                    this.showSearch = true;
                }else if (this.searchKeyWrds === "" && this.showSearch){
                    this.showSearch = false;
                }
            },
            urlClick(url){
                const onclick = url === "" ? "void(0)":`window.location='${url}';`
                return onclick
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