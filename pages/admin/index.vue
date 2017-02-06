<template>
    <div>
        <Sidebar></Sidebar>
        <div class='admin-content-field' :class='{"toFullScreen":toFullScreen}'>
            <header class="navbar navbar-default admin-header-nav" :class='{"toFullScreen":toFullScreen}'>
                <Header-View>
                    <button class='btn btn-default btn-lg admin-header-switch' @click='sideBarToggle'><i class='fa fa-chevron-right' :class='{switch:toFullScreen}'></i></button>
                </Header-View>
            </header>
            <div class='admin-content container-fluid'>
                <nuxt-child></nuxt-child>
            </div>
            <footer class='admin-footer'></footer>
        </div>
    </div>
</template>

<script>

    import HeaderView from "~components/admin/header.vue";
    import Sidebar from "~components/admin/sidebar.vue";

    export default {
        fetch({store,redirect,route}){
            if (!store.state.isLogin){
                redirect('/pages/1');
            }else if (route.name == 'admin' && route.matched.length == 1){
                //如果访问路径为admin则自动direct到子目录
                redirect('/admin/general');
            }
        },
        data(){
            return{
                toFullScreen:false,
                abc:true
            }
        },
        components:{
            HeaderView,
            Sidebar
        },
        head(){
            return {
                title:"Scms | 管理中心",
                meta: [
                    {charset:'utf-8'},
                    { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1,minimum-scale=1' },
                ],
                metaInfo: {
                    base: { target: '_blank', href: '/' }
                },
                link:[
                    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
                    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
                    { rel: 'stylesheet', href: '/style/main.css' },
                    { rel: 'icon', type:'image/png', href:'/images/favicon.png'}
                ]
            }
        },
        methods:{
            sideBarToggle(){
                $(".admin-sidebar").animate({width: 'toggle',opacity:'toggle'});
                this.toFullScreen = !this.toFullScreen;
            }
        }
    }
</script>