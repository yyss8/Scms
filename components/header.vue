<template>
    <div class='headerview'>
        <div class='row headerBtns'>
            <div class='col-md-9'>
                <nuxt-link class="navbar-text header-logo" to='/'><img src='/images/logo.png'></nuxt-link>
                <ul class="nav navbar-nav header-link">
                    <span v-for='(link, linkIndex) in $store.state.headerLink' :class={dropdown:link.hasSub} :key='`link-${linkIndex}`'>
                        <button class="navbtn" :onclick='urlClick(link.url)'><i v-if='link.icon !== ""' class='fa' :class='link.icon'>&nbsp;&nbsp;&nbsp;</i>
                            <b style='position: relative;top:-2px'>{{link.name}}</b>
                        </button>
                        <div class="dropdown-content" v-if='link.hasSub'>
                            <nuxt-link v-for='(sub, subIndex) in link.subLinks' :key='`sub-link-${subIndex}`' :to='sub.url !== "" ? `${sub.url}/pages/1`:"javascript:void(0)"'>{{sub.name}}</nuxt-link>
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
                    <Login-View v-if='!isLogin'></Login-View>
                    <Quick-Setting v-if='isLogin'></Quick-Setting>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import SearchView from "./header/searchBar.vue";
    import LoginView from "./header/loginview.vue";
    import QuickSetting from "./header/headersetting.vue";

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