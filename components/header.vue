<template>
    <div class='headerview'>
        <div class='row headerBtns'>
            <div class='col-md-9'>
                <a class="navbar-text header-logo" style='color:white;' href='/'><img src='/images/logo.png'></a>
                <ul class="nav navbar-nav header-link">
                    <span v-for='link in $store.state.headerLink' :class={dropdown:link.hasSub}>
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

</style>