<template>
    <div class='headerview'>
        <div class='row headerBtns'>
            <div class='col-md-9'>
                <a class="navbar-text header-logo" style='color:white;' href='/'><img src='/images/logo.png'></a>
                <ul class="nav navbar-nav header-link">
                    <span v-for='link in headerLink' :class={dropdown:link.hasSub}>
                        <button class="navbtn" :onclick='urlClick(link.url)'><i v-if='link.icon !== ""' class='fa' :class='link.icon'>&nbsp;&nbsp;&nbsp;</i><b style='position: relative;top:-2px'>{{link.name}}</b></button>
                        <div class="dropdown-content" v-if='link.hasSub'>
                            <a v-for='sub in link.subLinks' :href='sub.url !== "" ? sub.url:"javascript:void(0)"'>{{sub.name}}</a>
                        </div>
                    </span>
                </ul>
                <button class='navbar-toggle' id='header_phone_nav' @click='showNavList'><i class='fa fa-navicon'></i></button>
                
            </div>
            <div class='col-md-3 header-link-right'>
                <Search-View></Search-View>
            </div>
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
</template>

<script>

    import SearchView from "./minorcomponents/searchBar.vue";
    import LoginView from "./minorcomponents/loginview.vue";
    import QuickSetting from "./minorcomponents/headersetting.vue";

    export default {
        data(){
            return {
                showSearch:false,
                searchKeyWrds:"",
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
            },
            showNavList(){
                $("#header_phone_navList").animate({height: 'toggle'});
                $('.sub_Nav_List').hide();
            }
        },
        components:{
            LoginView,
            QuickSetting,
            SearchView
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

    .header-link-right{
        margin-top:13px;
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

    #header_phone_nav{
        display:none;
    }

    @media screen and (min-width: 991px){
        /* for desktop */
        .headerview{
            min-width:1100px;
        }
    }

    @media screen and (max-width: 991px){

        .headerview{
            width:93%;
        }

        .headerBtns{
            text-align: center;
        }

        .searchInput{
            top:0px;
        }
    }

    @media screen and (max-width: 767px){

        .header-logo img{
            width:65px;
            float:left;
            padding-bottom: 10px;
        }

        #header_phone_nav{
            display: block;
            margin-top:8px;
            color:white;
            border-color: white;
            padding-left:15px;
            padding-right:15px;
            margin-right:0px;
        }


        .header-link-right{
            display: none;
        }

        .header-link{
            display: none;
        }

        .navbar-default{
            border-bottom: none;
        }
    }
</style>